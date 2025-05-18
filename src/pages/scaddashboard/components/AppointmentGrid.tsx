import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import PhoneIcon from '@mui/icons-material/Phone';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { keyframes, styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';

interface Appointment {
  id: number;
  title: string;
  date: string;
  status: 'Scheduled' | 'Completed';
  Intern: string;
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
  Intern
}: {
  open: boolean;
  onClose: () => void;
  Intern: string;
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
          textAlign: 'center',
        }
      }}
    >
      <DialogTitle
        sx={{
          color: 'text.primary',
          backgroundColor: 'background.paper',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        Connecting Call...
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: 'background.paper' }}>
        <AnimatedAvatar>
          <PhoneIcon />
        </AnimatedAvatar>

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 600, color: theme.palette.text.primary }}>
          {Intern}
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
    Intern: 'john.doe@company.com',
    location: 'Conference Room A',
    online: true
  },
  {
    id: 2,
    title: 'Design Review Session',
    date: '27/05/2024 11:00',
    status: 'Scheduled',
    Intern: 'jane.smith@design.com',
    location: 'Virtual',
    online: false
  }
];

const initialIncomingAppointments: IncomingAppointment[] = [
  { id: 1, name: 'John Smith', accepted: false },
  { id: 2, name: 'Alice Johnson', accepted: false },
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

  const appointmentColumns: GridColDef[] = [
    { field: 'title', headerName: 'Appointment Title', width: 300, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'date', headerName: 'Date', width: 200, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'Intern', headerName: 'Intern', flex: 1, width: 250, align: 'center', headerAlign: 'center' },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 , mt: 2 }}>
          <CircleIcon sx={{
            color: params.row.online ? 'success.main' : 'error.main',
            fontSize: '0.8rem'
          }} />
          <Typography variant="body2">
            {params.row.online ? 'Online' : 'Offline'}
          </Typography>
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
    },
  ];

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

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError('');
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
        Intern: email,
        location: 'Virtual',
        callInitiated: false,
        online: true // Default to online when scheduling
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
        navigate('/VideoCallPageScad');
        setAppointments(prev =>
          prev.map(app =>
            app.id === selectedAppointment?.id ? { ...app, callInitiated: false } : app
          )
        );
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCallingScreen, navigate, selectedAppointment]);

  return (
    <Box sx={{ width: '100%', pl: 0, pb: 2 }}>
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
        Intern={selectedAppointment?.Intern || ''}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', pb: 2 }}>
          <Button variant="contained" onClick={handleClickOpen} color="primary" sx={{ alignSelf: 'flex-start' }}>
            Schedule New Appointment
          </Button>
        </Box>

        <Divider sx={{ width: '100%', my: 1 }} />

        <DataGrid
          rows={appointments}
          columns={appointmentColumns}
          disableRowSelectionOnClick
          onRowClick={() => { }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 20, 50]}
          rowHeight={60}
          sx={{
            '& .MuiDataGrid-cell:focus': { outline: 'none' },
            '& .MuiDataGrid-row:hover': { cursor: 'pointer' },
            width: '100%',
          }}
        />

        <Divider sx={{ width: '100%', my: 2 }} />

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Incoming Requests</Typography>
          {incomingAppointments.map((app) => (
            <Box key={app.id} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
              p: 1,
              borderRadius: 1,
              backgroundColor: 'background.paper',
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
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { backgroundColor: 'background.paper', minWidth: '600px' } }}>
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>Schedule New Appointment</DialogTitle>
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Intern Email"
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
            <FormHelperText error sx={{ mt: 2 }}>
              {error}
            </FormHelperText>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'background.paper' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSchedule}>Request</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}