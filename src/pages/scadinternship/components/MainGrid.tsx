import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import CustomDatePicker from './CustomDatePicker';

export default function ScadMainGrid() {
  const [expanded, setExpanded] = React.useState<string | false>('available-internships');
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
  const [dateError, setDateError] = React.useState<string | null>(null);
  const [notified, setNotified] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

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
            expanded={expanded === 'available-internships'}
            onChange={handleChange('available-internships')}
            sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="available-internships-content"
              id="available-internships-header"
              sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <Typography component="h2" variant="h6">
                Available Internships
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <Grid size={{ xs: 12, lg: 9 }}>
                <CustomizedDataGrid />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Stack>
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
        <Copyright sx={{ my: 4 }} />
      </Box>
    </LocalizationProvider>
  );
}