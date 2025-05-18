import * as React from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
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

export default function WorkshopVOD(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <AppNavbar />
        <SideMenu />
        {/* Main content */}
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
            {/* YouTube Video Player */}
            <Box sx={{ width: '100%', maxWidth: 1000 }}>
              <Box
                sx={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden',
                }}
              >
                <iframe
                  src=" https://www.youtube.com/embed/QehK6yLyUd8?si=oZHtJNRLZRFzg3qW" 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video"
                  onError={() => (
                    <Typography color="error" sx={{ p: 2 }}>
                      Failed to load video. Please check your network or try a different video.
                    </Typography>
                  )}
                />
              </Box>
              {/* Notes Textarea */}
              <Box sx={{ mt: 2 }}>
                <InputLabel htmlFor="notes-textarea">Notes</InputLabel>
                <TextareaAutosize
                  id="notes-textarea"
                  minRows={6}
                  maxRows={10}
                  placeholder="Enter your notes here..."
                  style={{
                    width: '100%',
                    fontSize: '1.1rem',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}