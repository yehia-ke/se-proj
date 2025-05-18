import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import { Divider } from '@mui/material';
import EvaluationReportTable from './EvaluationReport';
import InternshipInsights from './InternshipInsights';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MainGrid() {
  const [expanded, setExpanded] = React.useState<string | false>('internship-insights');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

      

    

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

            <Divider sx={{ my: 6 }} />

      <Copyright sx={{ my: 4 }} />

    </Box>
  );
}
