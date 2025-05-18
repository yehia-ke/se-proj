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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Job {
  id: number;
  jobTitle: string;
  companyName: string;
  companySize: string;
  industry: string;
  date: string; // Added date field
  duration: number;
  paid: boolean;
  expectedSalary?: number;
  skillsRequired: string[];
  jobDescription: string;
}

export default function CustomizedDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [filteredRows, setFilteredRows] = React.useState(initialRows);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [applyDialogOpen, setApplyDialogOpen] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [appliedJobs, setAppliedJobs] = React.useState<number[]>([]);

  // Search functionality
  React.useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = rows.filter(
      (row) =>
        row.jobTitle.toLowerCase().includes(lowerCaseQuery) ||
        row.companyName.toLowerCase().includes(lowerCaseQuery)
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

  const handleApplyClick = () => {
    setApplyDialogOpen(true);
  };

  const handleCloseApplyDialog = () => {
    setApplyDialogOpen(false);
    setUploadedFiles([]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const handleApplySubmit = () => {
    if (selectedJob) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== selectedJob.id));
    }

    handleCloseApplyDialog();
    handleCloseDialog();
  };

  return (
  <Accordion defaultExpanded>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
            aria-controls="in-progress-internships-content"
            id="in-progress-internships-header"
            sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
    >
      <Typography component="h2" variant="h6">Available Internships</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box sx={{ width: '100%', p: 2 }}>
        <TextField
          label="Search by Job Title or Company Name"
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
      <DataGrid
        rows={filteredRows.map((row) => ({
          ...row,
          onApply: (id: number) => {
            setAppliedJobs((prev) => [...prev, id]);
            setRows((prevRows) => prevRows.filter((r) => r.id !== id));
          },
          appliedJobs,
        }))}
        columns={columns}
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
          {selectedJob?.companyName} - {selectedJob?.jobTitle}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          {selectedJob && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Job Title:</strong> {selectedJob.jobTitle}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Company Name:</strong> {selectedJob.companyName}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Company Size:</strong> {selectedJob.companySize}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Industry:</strong> {selectedJob.industry}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Date:</strong> {selectedJob.date}
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
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ backgroundColor: 'background.paper' }}>
          <Button
            onClick={handleApplyClick}
            variant="contained"
            sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', mr: 1 }}
          >
            Apply
          </Button>
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
        open={applyDialogOpen}
        onClose={handleCloseApplyDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            minWidth: '400px',
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          Apply for {selectedJob?.jobTitle}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          <Typography sx={{ color: 'text.primary', mb: 2 }}>
            Upload any additional documents (e.g., certificates, cover letter, CV):
          </Typography>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            style={{ display: 'block', marginBottom: '16px' }}
          />
          {uploadedFiles.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Uploaded Files:</strong>
              </Typography>
              {uploadedFiles.map((file, index) => (
                <Typography key={index} sx={{ color: 'text.primary' }}>
                  - {file.name}
                </Typography>
              ))}
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ backgroundColor: 'background.paper' }}>
          <Button
            onClick={handleApplySubmit}
            variant="contained"
            sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', mr: 1 }}
          >
            Submit Application
          </Button>
          <Button
            onClick={handleCloseApplyDialog}
            variant="outlined"
            sx={{ color: 'primary.main', borderColor: 'primary.main' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </AccordionDetails>
  </Accordion>
);
}