import * as React from 'react';
import { useState, useEffect } from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import NotificationsMenu from './components/NotificationsMenu';
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
  const [chatMessages, setChatMessages] = useState<{ text: string; timestamp: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);

  // Send default message and notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatMessages([{ text: 'Welcome to the live session!', timestamp }]);
      setNotifications([
        {
          id: Date.now(), // Unique ID based on timestamp
          message: 'Received a message from a fellow attendee',
        },
      ]);
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatMessages([...chatMessages, { text: chatInput, timestamp }]);
      setChatInput('');
    }
  };

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
            {/* Notifications Menu */}
            <Box sx={{ alignSelf: 'flex-end' }}>
              <NotificationsMenu
                notifications={notifications ?? []} // Fallback to empty array
                setNotifications={setNotifications}
              />
            </Box>
            {/* YouTube Video Player */}
            <Box sx={{ width: '100%', maxWidth: 800 }}>
              <Box
                sx={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden',
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/QehK6yLyUd8?si=oZHtJNRLZRFzg3qW"
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
              {/* Chat and Notes Sections */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* Chat Section */}
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="chat-textarea">Chat</InputLabel>
                  <TextareaAutosize
                    id="chat-textarea"
                    minRows={6}
                    maxRows={10}
                    readOnly
                    value={chatMessages
                      .map((msg) => `[${msg.timestamp}] ${msg.text}`)
                      .join('\n')}
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
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <TextField
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a message..."
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                    <Button
                      variant="contained"
                      onClick={handleSendMessage}
                      sx={{ ml: 1 }}
                      disabled={!chatInput.trim()}
                    >
                      Send
                    </Button>
                  </Box>
                </Grid>
                {/* Notes Section */}
                <Grid item xs={12} md={6}>
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
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}