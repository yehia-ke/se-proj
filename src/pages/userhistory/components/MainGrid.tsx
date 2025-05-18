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
import CustomizedDataGrid from './CustomizedDataGrid';
import InProgressDataGrid from './InProgressDataGrid';
import AppliedInternshipsGrid from './AppliedInternshipsGrid';
import DraftsDataGrid from './DraftsDataGrid';
import PostsDataGrid from './PostsDataGrid';

export default function MainGrid() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  // Hardcoded data for applied internships
  const appliedRows = [
    {
      id: 101,
      jobTitle: 'Software Engineer Intern',
      companyName: 'Tech Corp',
      companySize: 'Large',
      industry: 'Technology',
      duration: 12,
      status: 'Pending',
      paid: true,
      expectedSalary: 2000,
      skillsRequired: ['JavaScript', 'React'],
      jobDescription: 'Develop web applications',
    },
    {
      id: 102,
      jobTitle: 'Data Analyst Intern',
      companyName: 'Data Inc',
      companySize: 'Medium',
      industry: 'Analytics',
      duration: 8,
      status: 'Accepted',
      paid: false,
      skillsRequired: ['Python', 'SQL'],
      jobDescription: 'Analyze data sets',
    },
    {
      id: 103,
      jobTitle: 'Frontend Developer Intern',
      companyName: 'Web Solutions',
      companySize: 'Small',
      industry: 'Web Development',
      duration: 10,
      status: 'Finalized',
      paid: true,
      expectedSalary: 1500,
      skillsRequired: ['HTML', 'CSS', 'JavaScript'],
      jobDescription: 'Build responsive web interfaces',
    },
    {
      id: 104,
      jobTitle: 'Marketing Intern',
      companyName: 'Brand Boost',
      companySize: 'Medium',
      industry: 'Marketing',
      duration: 6,
      status: 'Rejected',
      paid: false,
      skillsRequired: ['SEO', 'Content Creation'],
      jobDescription: 'Assist in digital marketing campaigns',
    },
  ];

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* Applied Internships Section */}
      <Grid size={{ xs: 12, lg: 9 }}>
        <AppliedInternshipsGrid rows={appliedRows} />
      </Grid>
      <Stack spacing={2}>
        <Accordion
          onChange={handleChange('in-progress-internships')}
          sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="in-progress-internships-content"
            id="in-progress-internships-header"
            sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <Typography component="h2" variant="h6">
              Current Internships
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <InProgressDataGrid />
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'completed-internships'}
          onChange={handleChange('completed-internships')}
          sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="completed-internships-content"
            id="completed-internships-header"
            sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <Typography component="h2" variant="h6">
              Completed Internships
            </Typography>
          </AccordionSummary>
          <AccordionDetails >
            <Grid size={{ xs: 12, lg: 9 }}>
              <CustomizedDataGrid />
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'drafts'}
          onChange={handleChange('drafts')}
          sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="drafts-content"
            id="drafts-header"
            sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <Typography component="h2" variant="h6">
              Drafted Reports & Evaluations
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <DraftsDataGrid />
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'posts'}
          onChange={handleChange('posts')}
          sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="posts-content"
            id="posts-header"
            sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <Typography component="h2" variant="h6">
              Posted Evaluations & Reports
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <PostsDataGrid />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}