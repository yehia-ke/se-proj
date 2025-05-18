import * as React from 'react';
import { CssBaseline, Box, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import ProOnlyGrid from './components/ProOnlyGrid';
import SideMenu from './components/SideMenu';
import AppTheme from '../../../shared-theme/AppTheme';
import NotificationsMenu from './components/NotificationsMenu';
import { NotificationProvider } from './components/NotificationsContext';
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
      <NotificationProvider>
        <Box sx={{ display: 'flex' }}>
          {/* Side Menu with inherited theme */}
          <SideMenu />

          {/* Main Navbar and Notifications */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1 }}>
              <AppNavbar />
            </Box>

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
                <ProOnlyGrid />
              </Stack>
            </Box>
          </Box>
        </Box>
      </NotificationProvider>
    </AppTheme>
  );
}