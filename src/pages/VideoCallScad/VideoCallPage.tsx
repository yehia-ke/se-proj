import * as React from 'react';
import { CssBaseline, Box, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import AppTheme from '../../../shared-theme/AppTheme';


import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Userdashboardpage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />

        <Box sx={{ display: 'flex' }}>

          {/* Main Navbar and Notifications */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            
            {/* Main Content */}
            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                  : alpha(theme.palette.background.default, 1),
                overflow: 'auto',
              })}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: 'center',
                  mx: 3,
                  pb: 5,
                  mt: { xs: 8, md: 0 },
                }}
              >
                <Header />
                <MainGrid />
    
              </Stack>
            </Box>
          </Box>
        </Box>
    </AppTheme>
  );
}