import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  PieChart,
  LineChart,
} from '@mui/x-charts';

import { Divider } from '@mui/material'

import { List, ListItem, ListItemText } from '@mui/material';


const reportStats = [
  { cycle: 'Cycle 1', accepted: 24, rejected: 4, flagged: 2 },
  { cycle: 'Cycle 2', accepted: 18, rejected: 6, flagged: 1 },
  { cycle: 'Cycle 3', accepted: 27, rejected: 3, flagged: 0 },
];

const averageReviewTime = [
  { cycle: 'Cycle 1', days: 5.2 },
  { cycle: 'Cycle 2', days: 4.5 },
  { cycle: 'Cycle 3', days: 6.1 },
];

const topCourses = [
  { course: 'Web Dev', count: 30 },
  { course: 'Data Science', count: 22 },
  { course: 'AI', count: 19 },
  { course: 'Cybersecurity', count: 15 },
];

const topRatedCompanies = [
  { company: 'TechCorp', rating: 4.8 },
  { company: 'InnovaSoft', rating: 4.6 },
  { company: 'DataX', rating: 4.4 },
];

const topInternshipCompanies = [
  { company: 'InnovaSoft', count: 16 },
  { company: 'TechCorp', count: 14 },
  { company: 'BuildWare', count: 10 },
];

export default function InternshipInsights() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleGenerateReport = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, sm: 3, md: 4 },
        boxSizing: 'border-box',
        maxWidth: '1500px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={2}>
        {/* Box 1 */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
            {/* Reports Status */}
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Reports Status per Cycle
              </Typography>
              <BarChart
                height={250}
                series={[
                  {
                    data: reportStats.map((d) => d.accepted),
                    label: 'Accepted',
                    color: '#4CAF50',
                  },
                  {
                    data: reportStats.map((d) => d.rejected),
                    label: 'Rejected',
                    color: '#FF5722',
                  },
                  {
                    data: reportStats.map((d) => d.flagged),
                    label: 'Flagged',
                    color: '#03A9F4',
                  },
                ]}
                xAxis={[
                  {
                    scaleType: 'band',
                    data: reportStats.map((d) => d.cycle),
                  },
                ]}
              />
            </Paper>

            {/* Avg Review Time */}
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Avg Review Time (days)
              </Typography>
              <LineChart
                height={250}
                series={[
                  {
                    data: averageReviewTime.map((d) => d.days),
                    label: 'Days',
                    color: '#2196F3',
                  },
                ]}
                xAxis={[
                  {
                    scaleType: 'point',
                    data: averageReviewTime.map((d) => d.cycle),
                  },
                ]}
              />
            </Paper>
          </Box>
        </Grid>

              {/* Box 2 */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
                  {/* Most Used Courses */}
                  <Paper sx={{ p: 4.7, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Most Used Courses
                    </Typography>
                    <PieChart
                      height={250}
                      series={[
                        {
                          data: topCourses.map((c) => ({
                            id: c.course,
                            value: c.count,
                            label: c.course,
                            color:
                              c.course === 'Web Dev'
                                ? '#3F51B5'
                                : c.course === 'Data Science'
                                  ? '#9C27B0'
                                  : c.course === 'AI'
                                    ? '#FF5722'
                                    : '#8BC34A',
                          })),
                        },
                      ]}
                    />
                  </Paper>

            {/* Top Rated Companies */}
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Top Rated Companies
              </Typography>
              <BarChart
                height={250}
                series={[
                  {
                    data: topRatedCompanies.map((c) => c.rating),
                    label: 'Rating',
                    color: '#607D8B',
                  },
                ]}
                xAxis={[
                  {
                    scaleType: 'band',
                    data: topRatedCompanies.map((c) => c.company),
                  },
                ]}
              />
            </Paper>
          </Box>
        </Grid>

        {/* Box 3 */}
        <Grid item xs={8}>
          <Paper sx={{ p: 10.97, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Top Companies by Internship Count
            </Typography>
            <BarChart
              height={520}
              series={[
                {
                  data: topInternshipCompanies.map((c) => c.count),
                  label: 'Internships',
                  color: '#fa9911',
                },
              ]}
              xAxis={[
                {
                  scaleType: 'band',
                  data: topInternshipCompanies.map((c) => c.company),
                },
              ]}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Button below all charts */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mr: { xs: 0, sm: 0, lg: 12 } }}>
        <Button variant="contained" color="primary" onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </Box>

      {/* Report Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            minWidth: '600px',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'text.primary',
            backgroundColor: 'background.paper',
            fontWeight: 600,
            fontSize: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Internship Insights Report
        </DialogTitle>
        <Divider sx={{ borderColor: 'divider' }} />
        <DialogContent
          dividers
          sx={{
            py: 3,
            backgroundColor: 'background.paper',
            overflowY: 'auto',
            maxHeight: '70vh',
          }}
        >
          <Box>
            {/* Report Status Section */}
            <Typography variant="body1" sx={{ mb: 2, color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary' }}>
              <strong>Reports Status:</strong> Over the last three cycles, the highest number of accepted reports was in Cycle 3 (27), with the lowest flagged reports (0). Cycle 2 had the highest rejection count (6).
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'divider' }} />

            {/* Average Review Time Section */}
            <Typography variant="body1" sx={{ mb: 2, color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary' }}>
              <strong>Average Review Time:</strong> The review time ranged from 4.5 to 6.1 days, with Cycle 2 being the fastest.
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'divider' }} />

            {/* Top Courses Section */}
            <Typography variant="body1" sx={{ mb: 2, color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary' }}>
              <strong>Top Courses:</strong> Web Development was the most popular course (30 students), followed by Data Science (22), AI (19), and Cybersecurity (15).
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'divider' }} />

            {/* Top Rated Companies Section */}
            <Typography variant="body1" sx={{ mb: 2, color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary' }}>
              <strong>Top Rated Companies:</strong> TechCorp leads with a 4.8 rating, followed by InnovaSoft (4.6) and DataX (4.4).
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'divider' }} />

            {/* Top Internship Providers Section */}
            <Typography variant="body1" sx={{ mb: 2, color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary' }}>
              <strong>Top Internship Providers:</strong> InnovaSoft provided the most internships (16), followed by TechCorp (14) and BuildWare (10).
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary', mb: 2 }}>
              Key Insights at a Glance
            </Typography>

            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary' }}>
                      <strong>Reports Status:</strong> Cycle 3 saw the highest number of accepted reports (27) and the lowest flagged reports (0).
                    </Typography>
                  }
                />
              </ListItem>
              <Divider sx={{ mb: 1, borderColor: 'divider' }} />
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary' }}>
                      <strong>Average Review Time:</strong> Cycle 2 was the fastest, with an average review time of 4.5 days.
                    </Typography>
                  }
                />
              </ListItem>
              <Divider sx={{ mb: 1, borderColor: 'divider' }} />
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary' }}>
                      <strong>Top Courses:</strong> Web Development was the most popular course with 30 students.
                    </Typography>
                  }
                />
              </ListItem>
              <Divider sx={{ mb: 1, borderColor: 'divider' }} />
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary' }}>
                      <strong>Top Rated Companies:</strong> TechCorp received the highest rating at 4.8.
                    </Typography>
                  }
                />
              </ListItem>
              <Divider sx={{ mb: 1, borderColor: 'divider' }} />
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary' }}>
                      <strong>Top Internship Providers:</strong> InnovaSoft provided the most internships (16).
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.getContrastText(theme.palette.secondary.main),
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
