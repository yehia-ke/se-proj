import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DataGrid,
  GridColDef
} from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  FormHelperText,
  Avatar,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { keyframes, styled, useTheme } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';

interface Appointment {
  id: number;
  title: string;
  date: string;
  status: 'Scheduled' | 'Completed';
  supervisor: string;
  location: string;
  callInitiated?: boolean;
  online: boolean;
}

interface IncomingAppointment {
  id: number;
  name: string;
  accepted: boolean;
}

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const AnimatedAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  margin: '20px auto',
  backgroundColor: theme.palette.success.main,
  animation: `${pulse} 2s infinite`,
  '& .MuiSvgIcon-root': {
    fontSize: '2rem'
  }
}));

const CallingScreen = ({
  open,
  onClose,
  supervisor
}: {
  open: boolean;
  onClose: () => void;
  supervisor: string;
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'transparent',
          borderRadius: 4,
          border: 'none',
          boxShadow: 'none',
          width: '20vw',
          maxWidth: 'none',
          padding: '0',
          textAlign: 'center'
        }
      }}
    >
      <DialogTitle
        sx={{
          color: 'text.primary',
          backgroundColor: 'background.paper',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}
      >
        Connecting Call...
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: 'background.paper' }}>
        <AnimatedAvatar>
          <PhoneIcon />
        </AnimatedAvatar>

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 600, color: theme.palette.text.primary }}>
          {supervisor}
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Connecting...
          </Typography>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircleIcon
            sx={{
              color: 'success.main',
              mr: 1,
              animation: `${pulse} 2s infinite`,
              fontSize: '1.2rem'
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Secure end-to-end encrypted
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const initialAppointments: Appointment[] = [
  {
    id: 1,
    title: 'Project Kickoff Meeting',
    date: '25/05/2024 14:30',
    status: 'Scheduled',
    supervisor: 'john.doe@company.com',
    location: 'Conference Room A',
    online: true
  },
  {
    id: 2,
    title: 'Design Review Session',
    date: '27/05/2024 11:00',
    status: 'Scheduled',
    supervisor: 'jane.smith@design.com',
    location: 'Virtual',
    online: false
  }
];

const initialIncomingAppointments: IncomingAppointment[] = [
  { id: 1, name: 'John Smith', accepted: false },
  { id: 2, name: 'Alice Johnson', accepted: false }
];

export default function AppointmentGrid() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [appointments, setAppointments] = React.useState<Appointment[]>(initialAppointments);
  const [incomingAppointments, setIncomingAppointments] = React.useState<IncomingAppointment[]>(initialIncomingAppointments);
  const [open, setOpen] = React.useState(false);
  const [showCallingScreen, setShowCallingScreen] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment | null>(null);
  const [email, setEmail] = React.useState('');
  const [time, setTime] = React.useState('');
  const [purpose, setPurpose] = React.useState('');
  const [error, setError] = React.useState('');

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleCallInitiation = (row: Appointment) => {
    if (!row.online) return;

    setSelectedAppointment(row);
    setShowCallingScreen(true);
    setAppointments(prev =>
      prev.map(app =>
        app.id === row.id ? { ...app, callInitiated: true } : app
      )
    );
  };

  const handleSchedule = () => {
    if (email && time && purpose) {
      const [datePart, timePart] = time.split('T');
      const [year, month, day] = datePart.split('-');
      const formattedDate = `${day}/${month}/${year} ${timePart}`;

      const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;

      setAppointments(prev => [...prev, {
        id: newId,
        title: purpose,
        date: formattedDate,
        status: 'Scheduled',
        supervisor: email,
        location: 'Virtual',
        callInitiated: false,
        online: true
      }]);

      setEmail('');
      setTime('');
      setPurpose('');
      setError('');
      handleClose();
    } else {
      setError('Please fill out all fields before scheduling.');
    }
  };

  const handleAccept = (id: number) => {
    setIncomingAppointments(prev =>
      prev.map(app => (app.id === id ? { ...app, accepted: true } : app))
    );
  };

  const handleReject = (id: number) => {
    setIncomingAppointments(prev => prev.filter(app => app.id !== id));
  };

  React.useEffect(() => {
    if (showCallingScreen) {
      const timer = setTimeout(() => {
        navigate('/VideoCallPage');
        setAppointments(prev =>
          prev.map(app =>
            app.id === selectedAppointment?.id ? { ...app, callInitiated: false } : app
          )
        );
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCallingScreen, navigate, selectedAppointment]);

  const appointmentColumns: GridColDef[] = [
    { field: 'title', headerName: 'Appointment Title', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'date', headerName: 'Date', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'supervisor', headerName: 'Supervisor', flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <CircleIcon sx={{ color: params.row.online ? 'success.main' : 'error.main', fontSize: '0.8rem' }} />
          <Typography variant="body2">{params.row.online ? 'Online' : 'Offline'}</Typography>
        </Box>
      )
    },
    {
      field: 'call',
      headerName: 'Call',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <IconButton
          color={params.row.callInitiated ? "success" : "primary"}
          onClick={(e) => {
            e.stopPropagation();
            handleCallInitiation(params.row);
          }}
          disabled={!params.row.online}
          sx={{
            opacity: params.row.online ? 1 : 0.5,
            '&:disabled': {
              pointerEvents: 'auto',
              cursor: 'not-allowed'
            }
          }}
        >
          <PhoneIcon />
        </IconButton>
      )
    }
  ];

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}

        sx={{
          '&:hover': { backgroundColor: 'action.hover' },
          backgroundColor: 'background.paper'
        }}

      >
        <Typography variant="h6">Appointments</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CallingScreen
          open={showCallingScreen}
          onClose={() => {
            setShowCallingScreen(false);
            setAppointments(prev =>
              prev.map(app =>
                app.id === selectedAppointment?.id ? { ...app, callInitiated: false } : app
              )
            );
          }}
          supervisor={selectedAppointment?.supervisor || ''}
        />

        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleClickOpen}>Schedule New Appointment</Button>
        </Box>

        <DataGrid
          rows={appointments}
          columns={appointmentColumns}
          disableRowSelectionOnClick
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 20, 50]}
          rowHeight={60}
          sx={{
            '& .MuiDataGrid-cell:focus': { outline: 'none' },
            '& .MuiDataGrid-row:hover': { cursor: 'pointer' }
          }}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>Incoming Requests</Typography>
        {incomingAppointments.map((app) => (
          <Box key={app.id} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
            p: 1,
            borderRadius: 1,
            backgroundColor: 'background.paper'
          }}>
            <Typography>{app.name}</Typography>
            {app.accepted ? (
              <Typography color="success.main">Accepted</Typography>
            ) : (
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleAccept(app.id)}
                  sx={{ mr: 1 }}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleReject(app.id)}
                >
                  Reject
                </Button>
              </Box>
            )}
          </Box>
        ))}

        <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { backgroundColor: 'background.paper', minWidth: '600px' } }}>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Supervisor Email"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Appointment Time"
              type="datetime-local"
              fullWidth
              variant="standard"
              InputLabelProps={{ shrink: true }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Purpose of Appointment"
              type="text"
              fullWidth
              variant="standard"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
            {error && (
              <FormHelperText error sx={{ mt: 2 }}>{error}</FormHelperText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSchedule}>Request</Button>
          </DialogActions>
        </Dialog>
      </AccordionDetails>
    </Accordion>
  );
}
