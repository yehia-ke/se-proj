import * as React from 'react';
import Stack from '@mui/material/Stack';
import VideoCallScreen from './VideoCallScreen';
import CallControls from './CallControls';
import { useNavigate } from 'react-router-dom';

export default function MainGrid() {
  const [isMuted, setIsMuted] = React.useState(true);
  const [audioStream, setAudioStream] = React.useState<MediaStream | null>(null);
  const [messages, setMessages] = React.useState<{ id: number; text: string }[]>([]);
  const [notifications, setNotifications] = React.useState<{ id: number; message: string }[]>([]);
  const [notes, setNotes] = React.useState('');
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const navigate = useNavigate();

  const stopStream = (stream: MediaStream | null) => {
    stream?.getTracks().forEach(track => track.stop());
  };

  // Handle audio
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

  // Add a message to the chat
  const addMessage = (text: string) => {
    const id = messages.length + 1;
    setMessages((prev) => [...prev, { id, text }]);
  };

  // Timed message
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const message = 'Workshop reminder: Take notes!';
      const id = messages.length + 1;
      setMessages((prev) => [...prev, { id, text: message }]);
      setNotifications((prev) => [...prev, { id, message }]);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    handleAudio(!isMuted);
  }, [isMuted]);

  return (
    <Stack sx={{ position: 'relative' }}>
      <VideoCallScreen
        messages={messages}
        addMessage={addMessage}
        notes={notes}
        setNotes={setNotes}
      />
      <CallControls
        isMuted={isMuted}
        toggleMic={() => setIsMuted(prev => !prev)}
        leaveCall={() => {
          stopStream(audioStream);
          navigate('/userdashboard');
        }}
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </Stack>
  );
}