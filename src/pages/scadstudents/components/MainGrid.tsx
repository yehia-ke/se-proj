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
import StudentsDataGrid from './StudentsDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';

export default function ScadMainGrid() {
  const [expanded, setExpanded] = React.useState<string | false>('students');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Stack spacing={2}>
        <Accordion
          expanded={expanded === 'students'}
          onChange={handleChange('students')}
          sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="students-content"
            id="students-header"
            sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <Typography component="h2" variant="h6">
              Students
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <StudentsDataGrid />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}