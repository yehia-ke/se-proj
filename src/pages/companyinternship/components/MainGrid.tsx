import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import PostedInternships from './PostedInternships'

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/*Posted Internships*/}
        <Grid size={{ xs: 12, lg: 9 }}>
          <PostedInternships />
        </Grid>
      
      {/* cards */}
        <Grid size={{ xs: 12, lg: 9 }} sx={{ mt: 2 }}>
          <CustomizedDataGrid />
        </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
