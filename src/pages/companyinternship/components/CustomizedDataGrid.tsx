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

  return (
    <Accordion>
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
            // Adjust label position when not focused
            transform: 'translate(14px, 8px) scale(1)',
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            // Adjust label position when focused or filled
            transform: 'translate(14px, -6px) scale(0.75)',
            backgroundColor: 'background.paper', // Ensure background covers the border
            padding: '0 4px', // Add padding to prevent border overlap
          },
        }}
      />
      <DataGrid
        rows={filteredRows}
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
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ color: 'primary.main', borderColor: 'primary.main' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </AccordionDetails>
    </Accordion>
  );
}