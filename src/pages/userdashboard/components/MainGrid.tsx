import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import AppliedInternshipsGrid from './AppliedInternshipsGrid';
import InternshipVideoGuide from './InternshipVideoGuide'

export default function MainGrid() {
    // Hardcoded data for applied internships
  const appliedRows = [
    {
      id: 101,
      jobTitle: 'Software Engineer Intern',
      companyName: 'Tech Corp',
      companySize: 'Large',
      industry: 'Technology',
      duration: 12,
      status: "Pending",
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
      status: "Accepted",
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
      status: "Finalized",
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
      status: "Rejected",
      paid: false,
      skillsRequired: ['SEO', 'Content Creation'],
      jobDescription: 'Assist in digital marketing campaigns',
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

        <Grid size={{ xs: 12, lg: 9 }}>
          <InternshipVideoGuide />
        </Grid>


      <Grid size={{ xs: 12, lg:9}}>
        <AppliedInternshipsGrid rows={appliedRows}/>
      </Grid>
      
      {/* cards */}
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
    </Box>
  );
}
