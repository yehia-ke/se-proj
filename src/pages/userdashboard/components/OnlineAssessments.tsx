import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Snackbar from '@mui/material/Snackbar'; // <-- Import Snackbar

// Define assessment interface
interface Assessment {
  id: number;
  name: string;
  marks: string | null;
  dateTaken: string | null;
  taken?: boolean; // Track if assessment is taken
  shared?: boolean; // Track if result is shared
}

// Take Assessment button component
const TakeAssessmentButton: React.FC<{
  id: number;
  taken?: boolean;
  onTake: () => void;
}> = ({ id, taken = false, onTake }) => {
  const handleClick = () => {
    if (!taken) {
      onTake();
    }
  };

  return (
    <Button
      variant="contained"
      color={taken ? 'success' : 'primary'}
      onClick={handleClick}
      disabled={taken}
      sx={{ textTransform: 'none' }}
    >
      {taken ? 'Completed' : 'Take Assessment?'}
    </Button>
  );
};

// Share Result button component
const ShareButton: React.FC<{
  id: number;
  shared?: boolean;
  onShare: () => void;
  onShowSnackbar: () => void;
}> = ({ id, shared = false, onShare, onShowSnackbar }) => {
  const handleClick = () => {
    if (!shared) {
      onShare();
      onShowSnackbar();
    }
  };

  return (
    <IconButton size="small" onClick={handleClick}>
      <ShareIcon />
    </IconButton>
  );
};

interface AssessmentGridProps {
  assessments?: Assessment[];
}

const sampleAssessments: Assessment[] = [
  {
    id: 1,
    name: 'Python Programming Test',
    marks: '10/10',
    dateTaken: '20/12/2024',
    taken: true,
    shared: false,
  },
  {
    id: 2,
    name: 'Data Structures Quiz',
    marks: '25/40',
    dateTaken: '10/05/2024',
    taken: true,
    shared: false,
  },
  {
    id: 3,
    name: 'SQL Fundamentals Assessment',
    marks: 'None',
    dateTaken: 'None',
    taken: false,
    shared: false,
  },
  {
    id: 4,
    name: 'JavaScript Coding Challenge',
    marks: 'None',
    dateTaken: 'None',
    taken: false,
    shared: false,
  },
  {
    id: 5,
    name: 'Machine Learning Basics',
    marks: 'None',
    dateTaken: 'None',
    taken: false,
    shared: false,
  },
];

export default function AssessmentGrid({ assessments = sampleAssessments }: AssessmentGridProps) {
  const [filteredAssessments, setFilteredAssessments] = React.useState(assessments);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  // Update filtered assessments when assessments prop changes
  React.useEffect(() => {
    setFilteredAssessments(assessments);
  }, [assessments]);

  // Handle search filtering
  React.useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = assessments.filter((assessment) =>
      assessment.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredAssessments(filtered);
  }, [searchQuery, assessments]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const handleShowSnackbar = () => setSnackbarOpen(true);
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  // Define columns for assessment data, inject snackbar handler
  const assessmentColumns: GridColDef[] = [
    { field: 'name', headerName: 'Online Assessment Name', width: 250, sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'marks', headerName: 'Marks', width: 150, sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'dateTaken', headerName: 'Date Taken', width: 200, sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'apply',
      headerName: 'Complete Assessment',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <TakeAssessmentButton
          id={params.row.id}
          taken={params.row.taken}
          onTake={() =>
            params.api.updateRows([
              {
                id: params.row.id,
                marks: '8/10', // Hardcoded marks
                dateTaken: '10/05/2025', // Hardcoded date
                taken: true,
              },
            ])
          }
        />
      ),
    },
    {
      field: 'share',
      headerName: 'Share Result',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      width: 200,
      sortable: false,
      renderCell: (params) =>
        params.row.taken ? (
          <ShareButton
            id={params.row.id}
            shared={params.row.shared}
            onShare={() =>
              params.api.updateRows([{ id: params.row.id, shared: true }])
            }
            onShowSnackbar={handleShowSnackbar}
          />
        ) : null,
    },
  ];

  return (
    <Box sx={{ width: '100%', pl: 0, pb: 2 }}>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="assessments-content"
          id="assessments-header"
          sx={{
            '&:hover': { backgroundColor: 'action.hover' },
            backgroundColor: 'background.paper'
          }}
        >
          <Typography component="h2" variant="h6">Online Assessments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Search by Assessment Name"
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
            rows={filteredAssessments}
            columns={assessmentColumns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 20, 50]}
            disableColumnResize
            rowHeight={60}
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
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            message="Link shared"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}