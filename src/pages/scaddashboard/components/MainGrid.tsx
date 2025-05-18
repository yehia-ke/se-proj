import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import WorkshopsDataGrid from './WorkshopsDataGrid';
import InternshipInsights from './InternshipInsights';
import AppointmentGrid from './AppointmentGrid';
import CallingScreen from './CallingScreen';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import CustomDatePicker from './CustomDatePicker';

export default function MainGrid() {
  const [callOpen, setCallOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>('internship-insights');
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
  const [dateError, setDateError] = React.useState<string | null>(null);
  const [notified, setNotified] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  React.useEffect(() => {
    // Automatically open call dialog on mount
    setCallOpen(true);
  }, []);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const validateDates = (start: Dayjs | null, end: Dayjs | null) => {
    if (start && end) {
      if (!start.isValid() || !end.isValid()) {
        setDateError('Invalid date');
      } else if (end.isBefore(start) || end.isSame(start)) {
        setDateError('End date must be after start date');
      } else {
        setDateError(null);
      }
    } else {
      setDateError(null);
    }
  };

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
    validateDates(newValue, endDate);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
    validateDates(startDate, newValue);
  };

  const handleNotifyClick = () => {
    setNotified(true);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3, md: 4 }, boxSizing: 'border-box' }}>
        <Stack spacing={2}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              Internship Cycle
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Start Date
                  </Typography>
                  <CustomDatePicker
                    value={startDate}
                    onChange={handleStartDateChange}
                    slotProps={{
                      nextIconButton: { size: 'small' },
                      previousIconButton: { size: 'small' },
                    }}
                    minDate={dayjs('2025-01-01')}
                    maxDate={dayjs('2030-12-31')}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    End Date
                  </Typography>
                  <CustomDatePicker
                    value={endDate}
                    onChange={handleEndDateChange}
                    slotProps={{
                      nextIconButton: { size: 'small' },
                      previousIconButton: { size: 'small' },
                    }}
                    minDate={dayjs('2025-01-01')}
                    maxDate={dayjs('2030-12-31')}
                  />
                </Box>
              </Box>
              {!notified && (
                <Button
                  variant="contained"
                  onClick={handleNotifyClick}
                  sx={{
                    height: '40px',
                    minWidth: '180px',
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                      color: '#000000',
                    },
                  }}
                >
                  Notify Students
                </Button>
              )}
            </Box>
            {dateError && (
              <Typography variant="caption" color="error">
                {dateError}
              </Typography>
            )}
          </Box>

          <Accordion
            expanded={expanded === 'company-applications'}
            onChange={handleChange('company-applications')}
            sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="company-applications-content"
              id="company-applications-header"
              sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <Typography component="h2" variant="h6">
                Company Applications
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <CustomizedDataGrid />
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'workshops'}
            onChange={handleChange('workshops')}
            sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="workshops-content"
              id="workshops-header"
              sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <Typography component="h2" variant="h6">
                Workshops
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <WorkshopsDataGrid />
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'scheduled_appointments'}
            onChange={handleChange('scheduled_appointments')}
            sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="scheduled-appointments-content"
              id="scheduled-appointments-header"
              sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <Typography component="h2" variant="h6">
                Scheduled Appointments
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <AppointmentGrid />
            </AccordionDetails>
          </Accordion>

          <CallingScreen
            open={callOpen}
            onClose={() => setCallOpen(false)}
            caller="Intern Calling"
          />

          <Accordion
            expanded={expanded === 'internship-insights'}
            onChange={handleChange('internship-insights')}
            sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="internship-insights-content"
              id="internship-insights-header"
              sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <Typography component="h2" variant="h6">
                Internship Insights
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <InternshipInsights />
            </AccordionDetails>
          </Accordion>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'white',
                px: 2,
                py: 1.5,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <CheckCircleIcon sx={{ color: 'success.main' }} />
              <Box component="span" sx={{ color: 'black', fontWeight: 500 }}>
                Students Notified
              </Box>
            </Box>
          </Snackbar>
        </Stack>
        <Copyright sx={{ my: 4 }} />
      </Box>
    </LocalizationProvider>
  );
}