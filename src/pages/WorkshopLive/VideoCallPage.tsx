import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
  CssBaseline,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChatIcon from '@mui/icons-material/Chat';
import NoteIcon from '@mui/icons-material/Note';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
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

interface VideoCallScreenProps {
  messages: { id: number; text: string; timestamp: string }[];
  addMessage: (text: string) => void;
  showChatSidebar: boolean;
}

interface CallControlsProps {
  isMuted: boolean;
  toggleMic: () => void;
  leaveCall: () => void;
  notifications: { id: number; message: string }[];
  setNotifications: React.Dispatch<React.SetStateAction<{ id: number; message: string }[]>>;
  toggleChatSidebar: () => void;
  showChatSidebar: boolean;
  openNotesDialog: () => void;
}

interface ChatSidebarProps {
  messages: { id: number; text: string; timestamp: string }[];
  addMessage: (text: string) => void;
}

const commonStyles = {
  container: {
    position: 'relative',
    transition: 'all 0.3s ease',
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: 3,
    backgroundColor: 'background.default',
    border: '1px solid',
    borderColor: 'divider',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'background.paper',
  },
  onlineBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    px: 1,
    py: 0.25,
    borderRadius: 1,
    color: 'white',
    fontSize: '0.75rem',
    zIndex: 2,
  },
};

function VideoCallScreen({ messages, addMessage, showChatSidebar }: VideoCallScreenProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '75vh',
        width: '100vw',
        maxWidth: 'none',
        minWidth: '100vw',
        position: 'relative',
        margin: 0,
        overflow: 'visible',
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ ...commonStyles.container, width: '100%', height: '100%', zIndex: 1 }}>
          <Box sx={commonStyles.onlineBadge}>
            <FiberManualRecordIcon fontSize="small" sx={{ color: 'limegreen' }} />
            <Typography variant="caption">Online</Typography>
          </Box>
          <Box sx={commonStyles.placeholder}>
            <Typography variant="h6" color="text.secondary">
              Workshop Teacher Feed
            </Typography>
          </Box>
        </Box>
      </Box>
      {showChatSidebar && (
        <ChatSidebar messages={messages} addMessage={addMessage} />
      )}
    </Box>
  );
}

function CallControls({
  isMuted,
  toggleMic,
  leaveCall,
  notifications,
  setNotifications,
  toggleChatSidebar,
  showChatSidebar,
  openNotesDialog,
}: CallControlsProps) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        mt: 2,
        backgroundColor: 'background.paper',
        borderRadius: 4,
        padding: 1.5,
        boxShadow: 3,
        mx: 'auto',
      }}
    >
      <NotificationsMenu notifications={notifications} setNotifications={setNotifications} />
      <IconButton onClick={toggleMic} title={isMuted ? 'Unmute' : 'Mute'}>
        {isMuted ? <MicOffIcon color="error" /> : <MicIcon />}
      </IconButton>
      <IconButton onClick={leaveCall} title="Leave call" color="error">
        <ExitToAppIcon />
      </IconButton>
      <IconButton
        onClick={toggleChatSidebar}
        title={showChatSidebar ? 'Hide Chat' : 'Show Chat'}
        color={showChatSidebar ? 'primary' : 'default'}
      >
        <ChatIcon />
      </IconButton>
      <IconButton onClick={openNotesDialog} title="Take Notes">
        <NoteIcon />
      </IconButton>
    </Box>
  );
}

function ChatSidebar({ messages, addMessage }: ChatSidebarProps) {
  const [input, setInput] = useState('');
  const handleSend = () => {
    if (input.trim()) {
      addMessage("John Doe: " + input);
      setInput('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };
  return (
    <Box
      sx={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        borderLeft: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
        zIndex: 1,
      }}
    >
      <Typography variant="caption" sx={{ p: 1, color: 'text.secondary' }}>
        Chat Sidebar
      </Typography>
      <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: 'background.default' }}>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <Typography key={msg.id} sx={{ mb: 1, wordBreak: 'break-word' }}>
              {msg.text}{' '}
              <Typography component="span" color="text.secondary" variant="caption">
                ({msg.timestamp})
              </Typography>
            </Typography>
          ))
        ) : (
          <Typography color="text.secondary">No messages yet</Typography>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <TextField
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          variant="outlined"
          size="small"
        />
      </Box>
    </Box>
  );
}

export default function Userdashboardpage(props: { disableCustomTheme?: boolean }) {
  const [isMuted, setIsMuted] = useState(true);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [messages, setMessages] = useState<{ id: number; text: string; timestamp: string }[]>([]);
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);
  const [showChatSidebar, setShowChatSidebar] = useState(true);
  const [notes, setNotes] = useState('');
  const [openNotesDialog, setOpenNotesDialog] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const stopStream = (stream: MediaStream | null) => {
    stream?.getTracks().forEach(track => track.stop());
  };

  const handleAudio = async (enable: boolean) => {
    if (enable) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(stream);
        audioRef.current = new Audio();
        audioRef.current.srcObject = stream;
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      } catch (error) {
        console.error('Microphone Error:', error);
        setIsMuted(true);
      }
    } else {
      stopStream(audioStream);
      setAudioStream(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.srcObject = null;
        audioRef.current = null;
      }
    }
  };

  const addMessage = (text: string) => {
    const id = Date.now();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { id, text, timestamp }]);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      const message = 'Welcome to the live session!';
      const id = Date.now();
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { id, text: message, timestamp }]);
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), message: 'Received a message from a fellow attendee' },
      ]);
    }, 3000);

    const timer2 = setTimeout(() => {
      const message = 'Workshop reminder: Take notes!';
      const id = Date.now();
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { id, text: message, timestamp }]);
      setNotifications((prev) => [...prev, { id: Date.now(), message }]);
    }, 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    handleAudio(!isMuted);
  }, [isMuted]);

  const handleNotesDialogOpen = () => {
    setOpenNotesDialog(true);
  };

  const handleNotesDialogClose = () => {
    setOpenNotesDialog(false);
  };

  const handleNotesSave = () => {
    setOpenNotesDialog(false);
    // Notes are already saved in state; you can add additional save logic here if needed
  };

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', width: '100vw', minHeight: '100vh' }}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
              spacing={1}
              sx={{
                alignItems: 'center',
                pb: 1,
                mt: { xs: 2, md: 0 },
                width: '100%',
              }}
            >
              <Header />
              <VideoCallScreen
                messages={messages}
                addMessage={addMessage}
                showChatSidebar={showChatSidebar}
              />
              <CallControls
                isMuted={isMuted}
                toggleMic={() => setIsMuted((prev) => !prev)}
                leaveCall={() => {
                  stopStream(audioStream);
                  navigate('/userdashboard');
                }}
                notifications={notifications}
                setNotifications={setNotifications}
                toggleChatSidebar={() => setShowChatSidebar((prev) => !prev)}
                showChatSidebar={showChatSidebar}
                openNotesDialog={handleNotesDialogOpen}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={openNotesDialog}
        onClose={handleNotesDialogClose}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            color: 'text.primary',
          },
        }}
      >
        <DialogTitle  sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>Workshop Notes</DialogTitle>
        <DialogContent sx={{ paddingTop: '8px !important', p: 2, backgroundColor: 'background.paper' }}>
          <TextField
            multiline
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes here..."
            fullWidth
            sx={{
              width: '100%',
              minHeight: '400px',
              '& .MuiOutlinedInput-root': {
                minHeight: '400px',
                height: '100%',
                alignItems: 'flex-start',
                '& fieldset': {
                  borderColor: 'divider',
                },
              },
              '& .MuiOutlinedInput-input': {
                height: '100% !important',
                overflow: 'auto !important',
              },
            }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions  sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          <Button onClick={handleNotesDialogClose}>Cancel</Button>
          <Button onClick={handleNotesSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AppTheme>
  );
}