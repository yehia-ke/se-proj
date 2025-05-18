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
import ReportDataGrid from './ReportDataGrid';
import EvaluationDataGrid from './EvaluationDataGrid';
import ReportEvalDataGrid from './ReportEvalDataGrid';

export default function ScadMainGrid() {
  const [expanded, setExpanded] = React.useState<string | false>('reports');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Stack spacing={2}>
        <Accordion
          expanded={expanded === 'reports'}
          onChange={handleChange('reports')}
          sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="reports-content"
            id="reports-header"
            sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <Typography component="h2" variant="h6">
              Submitted Reports
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <ReportDataGrid />
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'evaluations'}
          onChange={handleChange('evaluations')}
          sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="evaluations-content"
            id="evaluations-header"
            sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <Typography component="h2" variant="h6">
              Internship Evaluations
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <EvaluationDataGrid />
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'evaluations'}
          onChange={handleChange('evaluations')}
          sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="evaluations-content"
            id="evaluations-header"
            sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <Typography component="h2" variant="h6">
              Rejected Reports
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <ReportEvalDataGrid />
            </Grid>
          </AccordionDetails>
        </Accordion>



      </Stack>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}