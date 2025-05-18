import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import ApplicationsDataGrid from './ApplicationsDataGrid';

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Grid size={{ xs: 12, lg: 9 }}>
        <ApplicationsDataGrid
          rows={[
            { id: 1, jobTitle: 'Software Engineer', name: 'John Doe', 
              applicationDetails: { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', 
                phone: '123456789', skills: ['Skill 1', 'Skill 2'] } },
            { id: 2, jobTitle: 'Software Engineer', name: 'Aly Gaafar', 
              applicationDetails: { id: 2, name: 'Aly Gaafar', email: 'alimohamedgaafar@gmail.com', 
                phone: '01027210226', skills: ['pro/indontknowing', 'music'] } },
            { id: 3, jobTitle: 'CEO', name: 'Mohamed Ashraf', 
              applicationDetails: { id: 1, name: 'Mohamed Ashraf', email: 'CEO@gmail.com', 
                phone: '1', skills: ['CEO', 'CEO'] } },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, lg: 9 }} sx={{ mt: 2 }}>
        <CustomizedDataGrid />
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
