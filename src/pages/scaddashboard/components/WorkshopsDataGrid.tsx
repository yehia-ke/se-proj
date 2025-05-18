import * as React from 'react';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddIcon from '@mui/icons-material/Add';

// Define workshop interface
interface Workshop {
  id: number;
  workshopName: string;
  industry: string;
  startDateTime: string;
  endDateTime: string;
  shortDescription: string;
  speakerBio: string;
  agenda: string;
}

// Define columns for workshop data
const workshopColumns: GridColDef[] = [
  { field: 'workshopName', headerName: 'Workshop Name', flex:1 , sortable: true },
  { field: 'industry', headerName: 'Industry', flex:1, sortable: true },
  { field: 'startDateTime', headerName: 'Start Date & Time', flex:1, sortable: true },
  { field: 'endDateTime', headerName: 'End Date & Time', flex:1, sortable: true },
];

// Hardcoded workshop data
const initialWorkshops: Workshop[] = [
  {
    id: 1,
    workshopName: 'Introduction to Machine Learning',
    industry: 'Technology',
    startDateTime: '2025-06-01 09:00',
    endDateTime: '2025-06-01 17:00',
    shortDescription: 'A beginner-friendly workshop on machine learning concepts and applications.',
    speakerBio: 'Dr. Jane Smith, AI researcher with 10+ years of experience at MIT.',
    agenda: 'Morning: ML Basics, Afternoon: Hands-on Python ML projects.',
  },
  {
    id: 2,
    workshopName: 'Cloud Computing Essentials',
    industry: 'Technology',
    startDateTime: '2025-07-15 10:00',
    endDateTime: '2025-07-16 16:00',
    shortDescription: 'Learn the fundamentals of cloud computing with AWS and Azure.',
    speakerBio: 'John Doe, Cloud Architect with certifications in AWS and Azure.',
    agenda: 'Day 1: Cloud Concepts, Day 2: Practical Deployment.',
  },
  {
    id: 3,
    workshopName: 'Digital Marketing Strategies',
    industry: 'Marketing',
    startDateTime: '2025-08-10 13:00',
    endDateTime: '2025-08-10 18:00',
    shortDescription: 'Explore modern digital marketing techniques and tools.',
    speakerBio: 'Sarah Johnson, Marketing Consultant with 15 years in the industry.',
    agenda: 'SEO, Social Media Marketing, and Analytics.',
  },
];

export default function WorkshopGrid() {
  const [rows, setRows] = React.useState(initialWorkshops);
  const [filteredRows, setFilteredRows] = React.useState(initialWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = React.useState<Workshop | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [editWorkshop, setEditWorkshop] = React.useState<Workshop | null>(null);
  const [workshopToDelete, setWorkshopToDelete] = React.useState<Workshop | null>(null);
  const [newWorkshop, setNewWorkshop] = React.useState<Partial<Workshop>>({
    workshopName: '',
    industry: '',
    startDateTime: '',
    endDateTime: '',
    shortDescription: '',
    speakerBio: '',
    agenda: '',
  });

  // Search functionality (only by workshop name)
  React.useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = rows.filter((row) =>
      row.workshopName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRows(filtered);
  }, [searchQuery, rows]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedWorkshop(params.row as Workshop);
  };

  const handleCloseDialog = () => {
    setSelectedWorkshop(null);
  };

  const handleEditClick = (workshop: Workshop, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click event
    setEditWorkshop(workshop);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (workshop: Workshop, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click event
    setWorkshopToDelete(workshop);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (workshopToDelete) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== workshopToDelete.id));
    }
    setDeleteConfirmOpen(false);
    setWorkshopToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setWorkshopToDelete(null);
  };

  const handleEditChange = (field: keyof Workshop, value: any) => {
    setEditWorkshop((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleEditSubmit = () => {
    if (editWorkshop) {
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === editWorkshop.id ? editWorkshop : row))
      );
    }
    setEditDialogOpen(false);
    setEditWorkshop(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditWorkshop(null);
  };

  const handleCreateClick = () => {
    setCreateDialogOpen(true);
  };

  const handleCreateChange = (field: keyof Workshop, value: any) => {
    setNewWorkshop((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateSubmit = () => {
    if (newWorkshop.workshopName && newWorkshop.industry && newWorkshop.startDateTime && newWorkshop.endDateTime) {
      const newId = Math.max(...rows.map((row) => row.id), 0) + 1;
      const workshop: Workshop = {
        id: newId,
        workshopName: newWorkshop.workshopName,
        industry: newWorkshop.industry,
        startDateTime: newWorkshop.startDateTime,
        endDateTime: newWorkshop.endDateTime,
        shortDescription: newWorkshop.shortDescription || '',
        speakerBio: newWorkshop.speakerBio || '',
        agenda: newWorkshop.agenda || '',
      };
      setRows((prevRows) => [...prevRows, workshop]);
      setNewWorkshop({
        workshopName: '',
        industry: '',
        startDateTime: '',
        endDateTime: '',
        shortDescription: '',
        speakerBio: '',
        agenda: '',
      });
      setCreateDialogOpen(false);
    }
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
    setNewWorkshop({
      workshopName: '',
      industry: '',
      startDateTime: '',
      endDateTime: '',
      shortDescription: '',
      speakerBio: '',
      agenda: '',
    });
  };

  const actionColumn: GridColDef = {
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
          alignItems: 'center',
          justifyContent: 'left',
          height: '100%',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          onClick={(event) => handleEditClick(params.row as Workshop, event)}
          sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={(event) => handleDeleteClick(params.row as Workshop, event)}
          sx={{ backgroundColor: 'error.main', color: 'error.contrastText' }}
        >
          Delete
        </Button>
      </Box>
    ),
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search by Workshop Name"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          sx={{
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
            '&.Mui-focused': {
              mb: 1,
              transform: 'translateX(10px)',
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
          sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
        >
          Create Workshop
        </Button>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={[...workshopColumns, actionColumn]}
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
        open={!!selectedWorkshop}
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            minWidth: '500px',
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          {selectedWorkshop?.workshopName}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          {selectedWorkshop && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Workshop Name:</strong> {selectedWorkshop.workshopName}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Industry:</strong> {selectedWorkshop.industry}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Start Date & Time:</strong> {selectedWorkshop.startDateTime}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>End Date & Time:</strong> {selectedWorkshop.endDateTime}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Short Description:</strong> {selectedWorkshop.shortDescription}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Speaker Bio:</strong> {selectedWorkshop.speakerBio}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Agenda:</strong> {selectedWorkshop.agenda}
              </Typography>
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
          Edit Workshop: {editWorkshop?.workshopName}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          {editWorkshop && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                  Workshop Name
                </Typography>
                <TextField
                  value={editWorkshop.workshopName}
                  onChange={(e) => handleEditChange('workshopName', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                  Industry
                </Typography>
                <TextField
                  value={editWorkshop.industry}
                  onChange={(e) => handleEditChange('industry', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                  Start Date & Time
                </Typography>
                <TextField
                  type="datetime-local"
                  value={editWorkshop.startDateTime}
                  onChange={(e) => handleEditChange('startDateTime', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                  End Date & Time
                </Typography>
                <TextField
                  type="datetime-local"
                  value={editWorkshop.endDateTime}
                  onChange={(e) => handleEditChange('endDateTime', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                  Short Description
                </Typography>
                <TextareaAutosize
                  minRows={4}
                  value={editWorkshop.shortDescription}
                  onChange={(e) => handleEditChange('shortDescription', e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', borderColor: 'grey.500' }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary'}}>
                  Speaker Bio
                </Typography>
                <TextareaAutosize
                  minRows={4}
                  value={editWorkshop.speakerBio}
                  onChange={(e) => handleEditChange('speakerBio', e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', borderColor: 'grey.500' }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                  Agenda
                </Typography>
                <TextareaAutosize
                  minRows={4}
                  value={editWorkshop.agenda}
                  onChange={(e) => handleEditChange('agenda', e.target.value)}
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
          Create New Workshop
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                Workshop Name
              </Typography>
              <TextField
                value={newWorkshop.workshopName}
                onChange={(e) => handleCreateChange('workshopName', e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                Industry
              </Typography>
              <TextField
                value={newWorkshop.industry}
                onChange={(e) => handleCreateChange('industry', e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                Start Date & Time
              </Typography>
              <TextField
                type="datetime-local"
                value={newWorkshop.startDateTime}
                onChange={(e) => handleCreateChange('startDateTime', e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                End Date & Time
              </Typography>
              <TextField
                type="datetime-local"
                value={newWorkshop.endDateTime}
                onChange={(e) => handleCreateChange('endDateTime', e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                Short Description
              </Typography>
              <TextareaAutosize
                minRows={4}
                value={newWorkshop.shortDescription}
                onChange={(e) => handleCreateChange('shortDescription', e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', borderColor: 'grey.500' }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                Speaker Bio
              </Typography>
              <TextareaAutosize
                minRows={4}
                value={newWorkshop.speakerBio}
                onChange={(e) => handleCreateChange('speakerBio', e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', borderColor: 'grey.500' }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                Agenda
              </Typography>
              <TextareaAutosize
                minRows={4}
                value={newWorkshop.agenda}
                onChange={(e) => handleCreateChange('agenda', e.target.value)}
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
            Are you sure you want to delete the workshop "{workshopToDelete?.workshopName}"?
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
    </Box>
  );
}