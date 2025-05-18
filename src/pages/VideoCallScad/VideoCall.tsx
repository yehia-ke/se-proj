// src/pages/VideoCall/VideoCall.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ControlBar from './components/ControlBar';
import ParticipantsGrid from './components/ParticipantsGrid';
import Header from '../VideoCall/components/Header';

export default function VideoCall() {
  const theme = useTheme();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [supervisorStream, setSupervisorStream] = useState<MediaStream | null>(null);
  const navigate = useNavigate();

  const stopMediaTracks = useCallback((stream: MediaStream) => {
    stream.getTracks().forEach(track => track.stop());
  }, []);

  const enableMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoEnabled,
        audio: audioEnabled,
      });
      setLocalStream(prev => {
        if (prev) stopMediaTracks(prev);
        return stream;
      });
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  }, [videoEnabled, audioEnabled, stopMediaTracks]);

  const handleScreenShare = useCallback(async () => {
    try {
      if (screenSharing) {
        await enableMedia();
      } else {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        stream.getVideoTracks()[0].addEventListener('ended', () => {
          setScreenSharing(false);
          enableMedia();
        });
        setLocalStream(prev => {
          if (prev) stopMediaTracks(prev);
          return stream;
        });
      }
      setScreenSharing(!screenSharing);
    } catch (error) {
      console.error('Error handling screen share:', error);
    }
  }, [screenSharing, enableMedia, stopMediaTracks]);

  const leaveCall = useCallback(() => {
    if (localStream) stopMediaTracks(localStream);
    navigate('/userdashboard');
  }, [localStream, navigate, stopMediaTracks]);

  useEffect(() => {
    enableMedia();
    return () => {
      if (localStream) stopMediaTracks(localStream);
    };
  }, [enableMedia, localStream, stopMediaTracks]);

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      color: 'text.primary',
    }}>
      <Header />
      <Box sx={{ 
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        bgcolor: theme.palette.mode === 'dark' ? gray[900] : gray[100],
      }}>
        <ParticipantsGrid localStream={localStream} supervisorStream={supervisorStream} />
      </Box>
      <ControlBar
        videoEnabled={videoEnabled}
        audioEnabled={audioEnabled}
        screenSharing={screenSharing}
        toggleVideo={() => setVideoEnabled(!videoEnabled)}
        toggleAudio={() => setAudioEnabled(!audioEnabled)}
        toggleScreenShare={handleScreenShare}
        leaveCall={leaveCall}
      />
    </Box>
  );
}

const gray = {
  100: '#f4f5f7',
  900: '#0a0a0a',
};