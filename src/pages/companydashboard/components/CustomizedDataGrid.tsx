/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { columns, rows as initialRows } from '../internals/data/gridData';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddIcon from '@mui/icons-material/Add';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import InfoIcon from '@mui/icons-material/Info';
import { addNotification } from './notificationsManager';

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  skills: string[];
}

interface Job {
  id: number;
  jobTitle: string;
  industry: string;
  duration: number;
  paid: boolean;
  expectedSalary?: number;
  skillsRequired: string[];
  jobDescription: string;
  applicantNumber: number;
  applicants: Applicant[];
}

export default function CustomizedDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [filteredRows, setFilteredRows] = React.useState(initialRows);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [editJob, setEditJob] = React.useState<Job | null>(null);
  const [jobToDelete, setJobToDelete] = React.useState<Job | null>(null);
  const [newJob, setNewJob] = React.useState<Partial<Job>>({
    jobTitle: '',
    industry: '',
    duration: 0,
    paid: false,
    skillsRequired: [],
    jobDescription: '',
    applicantNumber: 0,
  });
  const [openNotificationSnackbar, setOpenNotificationSnackbar] = React.useState(false);
  const [applicantsDialogOpen, setApplicantsDialogOpen] = React.useState(false);
  const [lastCreatedJobId, setLastCreatedJobId] = React.useState<number | null>(null);

  // Search functionality (only by job title)
  React.useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = rows.filter((row) =>
      row.jobTitle.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRows(filtered);
  }, [searchQuery, rows]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedJob(params.row as Job);
  };

  const handleCloseDialog = () => {
    setSelectedJob(null);
  };

  const handleEditClick = (job: Job, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click event
    setEditJob(job);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (job: Job, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click event
    setJobToDelete(job);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (jobToDelete) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== jobToDelete.id));
    }
    setDeleteConfirmOpen(false);
    setJobToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setJobToDelete(null);
  };

  const handleEditChange = (field: keyof Job, value: any) => {
    setEditJob((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleEditSubmit = () => {
    if (editJob) {
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === editJob.id ? editJob : row))
      );
    }
    setEditDialogOpen(false);
    setEditJob(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditJob(null);
  };

  const handleCreateClick = () => {
    setCreateDialogOpen(true);
  };

  const handleCreateChange = (field: keyof Job, value: any) => {
    setNewJob((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateSubmit = () => {
    if (newJob.jobTitle && newJob.industry && newJob.duration) {
      const newId = Math.max(...rows.map((row) => row.id), 0) + 1;
      const job: Job = {
        id: newId,
        jobTitle: newJob.jobTitle,
        industry: newJob.industry,
        duration: newJob.duration,
        paid: newJob.paid || false,
        expectedSalary: newJob.paid ? newJob.expectedSalary : undefined,
        skillsRequired: newJob.skillsRequired || [],
        jobDescription: newJob.jobDescription || '',
        applicantNumber: newJob.applicantNumber || 0,
        applicants: [], // Initialize with empty applicants array
      };
      setRows((prevRows) => [...prevRows, job]);
      setNewJob({
        jobTitle: '',
        industry: '',
        duration: 0,
        paid: false,
        skillsRequired: [],
        jobDescription: '',
        applicantNumber: 0,
      });
      setOpenNotificationSnackbar(true); // Show notification snackbar
      setCreateDialogOpen(false);
      setLastCreatedJobId(newId);
    }
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
    setNewJob({
      jobTitle: '',
      industry: '',
      duration: 0,
      paid: false,
      skillsRequired: [],
      jobDescription: '',
      applicantNumber: 0,
    });
  };

  const handleCloseNotificationSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotificationSnackbar(false);
    if (lastCreatedJobId !== null) {
      const newJob = rows.find((row) => row.id === lastCreatedJobId);
      if (newJob) {
        addNotification(`New applicant for job: ${newJob.jobTitle}`);
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === lastCreatedJobId
              ? { ...row, applicantNumber: row.applicantNumber + 1 }
              : row
          )
        );
      }
    }
  };

  const actionColumn = {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    minWidth: 200,
    sortable: false,
    renderCell: (params: any) => (
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center', // Vertically center the buttons
          justifyContent: 'center', // Horizontally center the buttons
          height: '100%', // Ensure the Box takes the full height of the cell
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          onClick={(event) => handleEditClick(params.row as Job, event)}
          sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={(event) => handleDeleteClick(params.row as Job, event)}
          sx={{ backgroundColor: 'error.main', color: 'error.contrastText' }}
        >
          Delete
        </Button>
      </Box>
    ),
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="in-progress-internships-content"
        id="in-progress-internships-header"
        sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
      >
        <Typography component="h2" variant="h6">Posted Internships</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: '100%', p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              label="Search by Job Title"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              sx={{
                mb: 2,
                width: 300,
                transition: 'all 0.3s ease',
                '& .MuiOutlinedInput-root': {
                  '&:focus-within': {
                    outline: 'none',
                  },
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'grey.700',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    outline: 'none',
                  },
                },
                '& .MuiInputLabel-outlined': {
                  transform: 'translate(14px, 8px) scale(1)',
                },
                '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                  transform: 'translate(14px, -6px) scale(0.75)',
                  backgroundColor: 'background.paper',
                  padding: '0 4px',
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateClick}
              sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
            >
              Create Job
            </Button>
          </Box>
          <DataGrid
            rows={filteredRows}
            columns={[...columns, actionColumn]}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 20, 50]}
            disableColumnResize
            rowHeight={60}
            onRowClick={handleRowClick}
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
              '& .MuiDataGrid-row.Mui-selected': {
                backgroundColor: 'transparent',
              },
              '& .MuiDataGrid-cellCheckbox': {
                display: 'none',
              },
            }}
          />
          <Dialog
            open={!!selectedJob}
            onClose={handleCloseDialog}
            sx={{
              '& .MuiDialog-paper': {
                backgroundColor: 'background.paper',
                minWidth: '500px',
              },
            }}
          >
            <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
              {selectedJob?.jobTitle}
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ backgroundColor: 'background.paper' }}>
              {selectedJob && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>Job Title:</strong> {selectedJob.jobTitle}
                  </Typography>
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>Industry:</strong> {selectedJob.industry}
                  </Typography>
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>Duration:</strong> {selectedJob.duration} weeks
                  </Typography>
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>Paid/Unpaid:</strong> {selectedJob.paid ? 'Paid' : 'Unpaid'}
                  </Typography>
                  {selectedJob.paid && (
                    <Typography sx={{ color: 'text.primary' }}>
                      <strong>Expected Salary:</strong> {selectedJob.expectedSalary} EGP
                    </Typography>
                  )}
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>Skills Required:</strong> {selectedJob.skillsRequired.join(', ')}
                  </Typography>
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>Job Description:</strong> {selectedJob.jobDescription}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ color: 'text.primary' }}>
                      <strong>Number of Applicants:</strong> {selectedJob.applicantNumber}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setApplicantsDialogOpen(true)}
                      sx={{ color: 'primary.main', borderColor: 'primary.main', marginLeft: 'auto' }}
                    >
                      View Applicants
                    </Button>
                  </Box>
                  <Dialog
                    open={applicantsDialogOpen}
                    onClose={() => setApplicantsDialogOpen(false)}
                    maxWidth={false}
                    sx={{
                      '& .MuiDialog-paper': {
                        backgroundColor: 'background.paper',
                        minWidth: '90vw', // 90% of viewport width
                        maxWidth: '90vw', // 90% of viewport width
                        height: 'auto', // Maintain original height
                        margin: '20px', // Add some minimal margin
                      },
                    }}
                  >
                    <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
                      Applicants for {selectedJob?.jobTitle}
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{ backgroundColor: 'background.paper' }}>
                      <Box sx={{ maxHeight: 400, overflowY: 'auto', width: '100%' }}>
                        <DataGrid
                          rows={selectedJob?.applicants || []}
                          columns={[
                            { field: 'id', headerName: 'ID', width: 150 },
                            { field: 'name', headerName: 'Name', flex: 1 },
                            { field: 'email', headerName: 'Email', flex: 1 },
                            { field: 'phone', headerName: 'Phone', flex: 1 },
                            {
                              field: 'skills',
                              headerName: 'Skills',
                              flex: 2,
                              renderCell: (params) => params.value.join(', '),
                            },
                          ]}
                          initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                          }}
                          pageSizeOptions={[5, 10, 20]}
                          disableColumnResize
                          rowHeight={50}
                          sx={{
                            '& .MuiDataGrid-virtualScroller': {
                              minWidth: '1200px', // Ensures minimum width for content
                            },
                            '& .MuiDataGrid-row:hover': {
                              cursor: 'pointer',
                            },
                            '& .MuiDataGrid-cellCheckbox': {
                              display: 'none',
                            },
                          }}
                        />
                      </Box>
                    </DialogContent>
                    <Divider />
                    <DialogActions sx={{ backgroundColor: 'background.paper' }}>
                      <Button
                        onClick={() => setApplicantsDialogOpen(false)}
                        variant="outlined"
                        sx={{ color: 'primary.main', borderColor: 'primary.main', marginLeft: 'auto' }}
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              )}
            </DialogContent>
            <Divider />
            <DialogActions sx={{ backgroundColor: 'background.paper' }}>
              <Button
                onClick={handleCloseDialog}
                variant="outlined"
                sx={{ color: 'primary.main', borderColor: 'primary.main' }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={editDialogOpen}
            onClose={handleCloseEditDialog}
            sx={{
              '& .MuiDialog-paper': {
                backgroundColor: 'background.paper',
                minWidth: '500px',
              },
            }}
          >
            <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
              Edit Job: {editJob?.jobTitle}
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ backgroundColor: 'background.paper' }}>
              {editJob && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                      Job Title
                    </Typography>
                    <TextField
                      value={editJob.jobTitle}
                      onChange={(e) => handleEditChange('jobTitle', e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                      Industry
                    </Typography>
                    <TextField
                      value={editJob.industry}
                      onChange={(e) => handleEditChange('industry', e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                      Duration (Weeks)
                    </Typography>
                    <TextField
                      type="number"
                      value={editJob.duration}
                      onChange={(e) => handleEditChange('duration', parseInt(e.target.value))}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                      Paid/Unpaid
                    </Typography>
                    <TextField
                      value={editJob.paid ? 'Paid' : 'Unpaid'}
                      onChange={(e) => handleEditChange('paid', e.target.value === 'Paid')}
                      select
                      SelectProps={{ native: true }}
                      fullWidth
                      variant="outlined"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </TextField>
                  </Box>
                  {editJob.paid && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                        Expected Salary (EGP)
                      </Typography>
                      <TextField
                        type="number"
                        value={editJob.expectedSalary || ''}
                        onChange={(e) => handleEditChange('expectedSalary', parseInt(e.target.value))}
                        fullWidth
                        variant="outlined"
                      />
                    </Box>
                  )}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                      Skills Required (comma-separated)
                    </Typography>
                    <TextField
                      value={editJob.skillsRequired.join(', ')}
                      onChange={(e) => handleEditChange('skillsRequired', e.target.value.split(', '))}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                      Job Description
                    </Typography>
                    <TextareaAutosize
                      minRows={4}
                      value={editJob.jobDescription}
                      onChange={(e) => handleEditChange('jobDescription', e.target.value)}
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', borderColor: 'grey.500' }}
                    />
                  </Box>
                </Box>
              )}
            </DialogContent>
            <Divider />
            <DialogActions sx={{ backgroundColor: 'background.paper' }}>
              <Button
                onClick={handleEditSubmit}
                variant="contained"
                sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', mr: 1 }}
              >
                Save
              </Button>
              <Button
                onClick={handleCloseEditDialog}
                variant="outlined"
                sx={{ color: 'primary.main', borderColor: 'primary.main' }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={createDialogOpen}
            onClose={handleCloseCreateDialog}
            sx={{
              '& .MuiDialog-paper': {
                backgroundColor: 'background.paper',
                minWidth: '500px',
              },
            }}
          >
            <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
              Create New Job
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ backgroundColor: 'background.paper' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                    Job Title
                  </Typography>
                  <TextField
                    value={newJob.jobTitle}
                    onChange={(e) => handleCreateChange('jobTitle', e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                    Industry
                  </Typography>
                  <TextField
                    value={newJob.industry}
                    onChange={(e) => handleCreateChange('industry', e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                    Duration (Weeks)
                  </Typography>
                  <TextField
                    type="number"
                    value={newJob.duration || ''}
                    onChange={(e) => handleCreateChange('duration', parseInt(e.target.value))}
                    fullWidth
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                    Paid/Unpaid
                  </Typography>
                  <TextField
                    value={newJob.paid ? 'Paid' : 'Unpaid'}
                    onChange={(e) => handleCreateChange('paid', e.target.value === 'Paid')}
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    variant="outlined"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </TextField>
                </Box>
                {newJob.paid && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                      Expected Salary (EGP)
                    </Typography>
                    <TextField
                      type="number"
                      value={newJob.expectedSalary || ''}
                      onChange={(e) => handleCreateChange('expectedSalary', parseInt(e.target.value))}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                )}
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                    Skills Required (comma-separated)
                  </Typography>
                  <TextField
                    value={newJob.skillsRequired?.join(', ') || ''}
                    onChange={(e) => handleCreateChange('skillsRequired', e.target.value.split(', '))}
                    fullWidth
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                    Job Description
                  </Typography>
                  <TextareaAutosize
                    minRows={4}
                    value={newJob.jobDescription}
                    onChange={(e) => handleCreateChange('jobDescription', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', borderColor: 'grey.500' }}
                  />
                </Box>
              </Box>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ backgroundColor: 'background.paper' }}>
              <Button
                onClick={handleCreateSubmit}
                variant="contained"
                sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', mr: 1 }}
              >
                Create
              </Button>
              <Button
                onClick={handleCloseCreateDialog}
                variant="outlined"
                sx={{ color: 'primary.main', borderColor: 'primary.main' }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={deleteConfirmOpen}
            onClose={handleCancelDelete}
            sx={{
              '& .MuiDialog-paper': {
                backgroundColor: 'background.paper',
                minWidth: '400px',
              },
            }}
          >
            <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
              Confirm Deletion
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ backgroundColor: 'background.paper' }}>
              <Typography sx={{ color: 'text.primary' }}>
                Are you sure you want to delete the job listing "{jobToDelete?.jobTitle}"?
              </Typography>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ backgroundColor: 'background.paper' }}>
              <Button
                onClick={handleConfirmDelete}
                variant="contained"
                color="error"
                sx={{ mr: 1 }}
              >
                Delete
              </Button>
              <Button
                onClick={handleCancelDelete}
                variant="outlined"
                sx={{ color: 'primary.main', borderColor: 'primary.main' }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={openNotificationSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseNotificationSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'info.main',
                px: 2,
                py: 1.5,
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <InfoIcon sx={{ color: 'white' }} />
              <Box component="span" sx={{ color: 'white', fontWeight: 500 }}>
                You will be notified via system and email when someone applies to your posted internship.
              </Box>
            </Box>
          </Snackbar>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}