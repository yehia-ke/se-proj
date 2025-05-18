import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import ApplicationsDataGrid from './ApplicationsDataGrid';
import PostsDataGrid from './PostsDataGrid';
import DraftsDataGrid from './DraftsDataGrid';

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Grid size={{ xs: 12, lg: 9 }}>
        <ApplicationsDataGrid
          rows={[
            {
              id: 1, jobTitle: 'Software Engineer', name: 'John Doe',
              applicationDetails: {
                id: 1, name: 'John Doe', email: 'johndoe@gmail.com',
                phone: '123456789', skills: ['Skill 1', 'Skill 2']
              }
            },
            {
              id: 2, jobTitle: 'Software Engineer', name: 'Aly Gaafar',
              applicationDetails: {
                id: 2, name: 'Aly Gaafar', email: 'alimohamedgaafar@gmail.com',
                phone: '01027210226', skills: ['pro/indontknowing', 'music']
              }
            },
            {
              id: 3, jobTitle: 'CEO', name: 'Mohamed Ashraf',
              applicationDetails: {
                id: 1, name: 'Mohamed Ashraf', email: 'CEO@gmail.com',
                phone: '1', skills: ['CEO', 'CEO']
              }
            },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, lg: 9 }} sx={{ mt: 2 }}>
        <CustomizedDataGrid rows={[
          {
            id: 1,
            jobTitle: 'Software Engineer',
            name: 'John Doe',
            applicationDetails: {
              id: 1,
              name: 'John Doe',
              email: 'johndoe@gmail.com',
              phone: '123456789',
              skills: ['Skill 1', 'Skill 2']
            }
          },
          {
            id: 2,
            jobTitle: 'Software Engineer',
            name: 'Aly Gaafar',
            applicationDetails: {
              id: 2,
              name: 'Aly Gaafar',
              email: 'alimohamedgaafar@gmail.com',
              phone: '01027210226',
              skills: ['pro/indontknowing', 'music']
            }
          },
          {
            id: 3,
            jobTitle: 'CEO',
            name: 'Mohamed Ashraf',
            applicationDetails: {
              id: 1,
              name: 'Mohamed Ashraf',
              email: 'CEO@gmail.com',
              phone: '1',
              skills: ['CEO', 'CEO']
            }
          },
          {
            id: 4,
            jobTitle: 'Data Science Intern',
            name: 'Sara Ahmed',
            applicationDetails: {
              id: 4,
              name: 'Sara Ahmed',
              email: 'sara.ahmed@intern.com',
              phone: '9876543210',
              skills: ['Python', 'Machine Learning', 'Data Analysis']
            }
          },
          {
            id: 5,
            jobTitle: 'Frontend Developer Intern',
            name: 'Liam Chen',
            applicationDetails: {
              id: 5,
              name: 'Liam Chen',
              email: 'liam.chen@intern.com',
              phone: '5551234567',
              skills: ['React', 'JavaScript', 'CSS']
            }
          },
          {
            id: 6,
            jobTitle: 'Marketing Intern',
            name: 'Emma Rodriguez',
            applicationDetails: {
              id: 6,
              name: 'Emma Rodriguez',
              email: 'emma.rodriguez@intern.com',
              phone: '4449876543',
              skills: ['Social Media', 'Content Creation', 'SEO']
            }
          },
        ]} />
      </Grid>

      <Grid size={{ xs: 12, lg: 9 }} sx={{ mt: 2 }}>
        <DraftsDataGrid />
      </Grid>

      <Grid size={{ xs: 12, lg: 9 }} sx={{ mt: 2 }}>
        <PostsDataGrid />
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
