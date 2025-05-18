import * as React from 'react';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import { useTheme, keyframes } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNotifications } from './NotificationsContext';
import Snackbar from '@mui/material/Snackbar';

interface Workshop {
  id: number;
  workshopName: string;
  industry: string;
  startDateTime: string;
  endDateTime: string;
  shortDescription: string;
  speakerBio: string;
  agenda: string;
  applied?: boolean;
}

const bounce = keyframes`
  0% { transform: scale(1); }
  30% { transform: scale(1.15); }
  60% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const workshops: Workshop[] = [
  {
    id: 1,
    workshopName: 'AI for Beginners',
    industry: 'Technology',
    startDateTime: '2025-06-15T09:00',
    endDateTime: '2025-06-15T17:00',
    shortDescription: 'Introduction to artificial intelligence and its applications.',
    speakerBio: 'Dr. Alice Brown, AI expert with 12 years at Stanford.',
    agenda: 'Morning: AI Concepts, Afternoon: Practical Examples.',
    applied: false,
  },
  {
    id: 2,
    workshopName: 'Advanced Web Development',
    industry: 'Technology',
    startDateTime: '2025-07-20T10:00',
    endDateTime: '2025-07-21T16:00',
    shortDescription: 'Deep dive into modern web development frameworks.',
    speakerBio: 'Mark Wilson, Lead Developer at WebCorp.',
    agenda: 'Day 1: React/Next.js, Day 2: Backend Integration.',
    applied: false,
  },
  {
    id: 3,
    workshopName: 'Social Media Marketing',
    industry: 'Marketing',
    startDateTime: '2025-04-01T13:00',
    endDateTime: '2025-04-01T18:00',
    shortDescription: 'Strategies for effective social media campaigns.',
    speakerBio: 'Emma Davis, Marketing Specialist with 10 years of experience.',
    agenda: 'Content Creation, Analytics, and Campaign Optimization.',
    applied: false,
  },
  {
    id: 4,
    workshopName: 'Cybersecurity Essentials',
    industry: 'Technology',
    startDateTime: '2025-08-05T09:30',
    endDateTime: '2025-08-05T16:30',
    shortDescription: 'Learn the basics of securing digital systems.',
    speakerBio: 'Dr. Robert Lee, Cybersecurity Consultant.',
    agenda: 'Threat Identification, Security Protocols, and Best Practices.',
    applied: false,
  },
];

const currentDate = new Date('2025-05-10T00:00:00');
const upcomingWorkshops = workshops.filter(
  (workshop) => new Date(workshop.startDateTime) >= currentDate
);

type RenderActionsParams = {
  row: Workshop;
  appliedJobs: number[];
  onApply: (id: number) => void;
  onShowSnackbar: () => void;
};

const ApplyButton: React.FC<{
  id: number;
  applied?: boolean;
  workshopName: string;
  onApply: () => void;
  onShowSnackbar: () => void;
}> = ({ id, applied = false, workshopName, onApply, onShowSnackbar }) => {
  const theme = useTheme();
  const { addNotification } = useNotifications();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!applied) {
      onApply();
      addNotification({
        message: `Applied to "${workshopName}"`,
        type: 'apply',
        workshopId: id,
      });
      onShowSnackbar();
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      size="small"
      className={`apply-button apply-button-row-${id}`}
      startIcon={
        applied && (
          <CheckCircleIcon
            style={{
              fontSize: '20px',
              opacity: applied ? 1 : 0,
              transform: applied ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 0.3s ease-in-out 0.1s, transform 0.3s ease-in-out 0.1s',
            }}
          />
        )
      }
      style={{
        padding: applied ? '6px 12px' : '6px 16px',
        justifyContent: applied ? 'flex-start' : 'center',
        transition: 'background-color 0.3s ease-in-out, padding 0.3s ease-in-out',
        color: applied ? theme.palette.success.main : theme,
      }}
      sx={{
        '&:hover': {
          transform: applied ? undefined : 'scale(1.05)',
        },
        '&:active': {
          animation: `${bounce} 0.2s ease-in-out`,
        },
      }}
      disabled={applied}
    >
      <span>{applied ? 'Applied' : 'Apply'}</span>
    </Button>
  );
};

function RenderActions(params: RenderActionsParams) {
  const isApplied = params.appliedJobs.includes(params.row.id);

  return (
    <ApplyButton
      id={params.row.id}
      applied={isApplied}
      workshopName={params.row.workshopName}
      onApply={() => params.onApply(params.row.id)}
      onShowSnackbar={params.onShowSnackbar}
    />
  );
}

export default function Workshops() {
  const [selectedWorkshop, setSelectedWorkshop] = React.useState<Workshop | null>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [appliedJobs, setAppliedJobs] = React.useState<number[]>([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedWorkshop(params.row as Workshop);
  };

  const handleCloseDialog = () => {
    setSelectedWorkshop(null);
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const handleApply = (id: number) => {
    setAppliedJobs((prev) => [...prev, id]);
  };

  const handleShowSnackbar = () => setSnackbarOpen(true);
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const workshopColumns: GridColDef[] = [
    {
      field: 'workshopName',
      headerName: 'Workshop Name',
      flex: 1,
      sortable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'industry',
      headerName: 'Industry',
      flex: 1,
      sortable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'startDateTime',
      headerName: 'Start Date & Time',
      flex: 1,
      sortable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'endDateTime',
      headerName: 'End Date & Time',
      flex: 1,
      sortable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'apply',
      headerName: 'Apply',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        <RenderActions
          row={params.row}
          appliedJobs={appliedJobs}
          onApply={handleApply}
          onShowSnackbar={handleShowSnackbar}
        />,
    },
  ];

  return (
    <Box sx={{ width: '100%', pl: 0, pb: 2 }}>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="workshops-content"
          id="workshops-header"
          sx={{ '&:hover': { backgroundColor: 'action.hover' }, backgroundColor: 'background.paper' }}
        >
          <Typography component="h2" variant="h6">Upcoming Workshops</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataGrid
            rows={upcomingWorkshops}
            columns={workshopColumns}
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
              '& .MuiDataGrid-cell': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              '& .MuiDataGrid-columnHeader': {
                display: 'flex',
                justifyContent: 'center',
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
            message="Notification about workshop sent"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </AccordionDetails>
      </Accordion>

      <Dialog
        open={!!selectedWorkshop}
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            minWidth: '600px',
            maxWidth: '800px',
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper', textAlign: 'center' }}>
          {selectedWorkshop?.workshopName}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper', textAlign: 'center' }}>
          {selectedWorkshop && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Industry:</strong> {selectedWorkshop.industry}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Start:</strong> {new Date(selectedWorkshop.startDateTime).toLocaleString()}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>End:</strong> {new Date(selectedWorkshop.endDateTime).toLocaleString()}
              </Typography>
              <Divider sx={{ width: '80%' }} />
              <Typography sx={{ color: 'text.primary' }}>
                {selectedWorkshop.shortDescription}
              </Typography>
              <Typography sx={{ color: 'text.primary', fontStyle: 'italic' }}>
                {selectedWorkshop.speakerBio}
              </Typography>
              <Typography sx={{ color: 'text.primary', whiteSpace: 'pre-line', textAlign: 'center', width: '100%', p: 2 }}>
                {selectedWorkshop.agenda}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ backgroundColor: 'background.paper', justifyContent: 'center' }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}