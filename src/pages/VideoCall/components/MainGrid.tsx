import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';

import VideoCallScreen from './VideoCallScreen';
import CallControls from './CallControls';

export default function MainGrid() {
  const [isMuted, setIsMuted] = React.useState(true);
  const [isCameraOn, setIsCameraOn] = React.useState(false);
  const [isScreenSharing, setIsScreenSharing] = React.useState(false);
  const [isSwapped, setIsSwapped] = React.useState(false);
  const [localStream, setLocalStream] = React.useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = React.useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = React.useState<MediaStream | null>(null);
  const [isSupervisorVisible, setIsSupervisorVisible] = React.useState(true);
  const [supervisorCameraOn, setSupervisorCameraOn] = React.useState(true);
  const [showSupervisorLeftMsg, setShowSupervisorLeftMsg] = React.useState(false);

  const localVideoRef = React.useRef<HTMLVideoElement>(null);
  const screenShareRef = React.useRef<HTMLVideoElement>(null);
  const supervisorVideoRef = React.useRef<HTMLVideoElement>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const navigate = useNavigate();

  const stopStream = (stream: MediaStream | null) => {
    stream?.getTracks().forEach((track) => track.stop());
  };

  React.useEffect(() => {
    if (!isMuted) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          setAudioStream(stream);
          if (audioRef.current) {
            audioRef.current.srcObject = stream;
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(() => {});
          } else {
            const audioEl = new Audio();
            audioEl.srcObject = stream;
            audioEl.volume = 0.5;
            audioEl.play().catch(() => {});
            audioRef.current = audioEl;
          }
        })
        .catch(() => setIsMuted(true));
    } else {
      stopStream(audioStream);
      setAudioStream(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.srcObject = null;
        audioRef.current = null;
      }
    }
  }, [isMuted]);

  React.useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((videoStream) => {
          if (audioStream) {
            const combinedStream = new MediaStream([
              ...videoStream.getVideoTracks(),
              ...audioStream.getAudioTracks(),
            ]);
            setLocalStream(combinedStream);
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = combinedStream;
              localVideoRef.current.play().catch(() => {});
            }
          } else {
            setLocalStream(videoStream);
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = videoStream;
              localVideoRef.current.play().catch(() => {});
            }
          }
        })
        .catch(() => setIsCameraOn(false));
    } else {
      stopStream(localStream);
      setLocalStream(null);
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
    }
  }, [isCameraOn, audioStream]);

  React.useEffect(() => {
    if (isScreenSharing) {
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          setScreenStream(stream);
          if (screenShareRef.current) {
            screenShareRef.current.srcObject = stream;
            screenShareRef.current.play().catch(() => {});
          }
          stream.getTracks()[0].onended = () => setIsScreenSharing(false);
        })
        .catch(() => setIsScreenSharing(false));
    } else {
      stopStream(screenStream);
      setScreenStream(null);
      if (screenShareRef.current) screenShareRef.current.srcObject = null;
    }
  }, [isScreenSharing]);

  const toggleSupervisorVisibility = () => {
    if (isSupervisorVisible) {
      setIsSupervisorVisible(false);
      setShowSupervisorLeftMsg(true);
      if (isSwapped) setIsSwapped(false);
      setTimeout(() => setShowSupervisorLeftMsg(false), 3000);
    } else {
      setIsSupervisorVisible(true);
    }
  };

  const handleSwapClick = () => {
    if (isSupervisorVisible && supervisorCameraOn) {
      setIsSwapped((prev) => !prev);
    }
  };

  const leaveCall = () => {
    stopStream(localStream);
    stopStream(screenStream);
    stopStream(audioStream);
    navigate('/userdashboard');
  };

  return (
    <Stack sx={{ position: 'relative', height: '100vh' }}>
      <VideoCallScreen
        isSwapped={isSwapped}
        isCameraOn={isCameraOn}
        isScreenSharing={isScreenSharing}
        localVideoRef={localVideoRef}
        screenShareRef={screenShareRef}
        isSupervisorVisible={isSupervisorVisible}
        onSwap={handleSwapClick}
      />

      <Fade in={showSupervisorLeftMsg} timeout={500}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'rgba(0, 0, 0, 0.85)',
            color: 'common.white',
            px: 4,
            py: 2,
            borderRadius: 2,
            boxShadow: 24,
            zIndex: 1300,
            minWidth: 300,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            backdropFilter: 'blur(4px)',
          }}
        >
          <FiberManualRecordIcon fontSize="small" sx={{ color: 'error.main', minWidth: 24 }} />
          <Typography variant="body1" fontWeight={500}>
            Feed 2 has left the call
          </Typography>
        </Box>
      </Fade>

      <CallControls
        isMuted={isMuted}
        isVideoOn={isCameraOn}
        toggleMic={() => setIsMuted((prev) => !prev)}
        toggleVideo={() => {
          setIsScreenSharing(false);
          setIsCameraOn((prev) => !prev);
        }}
        toggleScreenShare={() => {
          setIsCameraOn(false);
          setIsScreenSharing((prev) => !prev);
        }}
        leaveCall={leaveCall}
        toggleSupervisorVisibility={toggleSupervisorVisibility}
        isSupervisorVisible={isSupervisorVisible}
      />
    </Stack>
  );
}