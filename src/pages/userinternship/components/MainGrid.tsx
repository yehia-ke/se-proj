import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* Available Internships Section */}
      <Grid size={{ xs: 12, lg: 9 }}>
        <CustomizedDataGrid />
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}