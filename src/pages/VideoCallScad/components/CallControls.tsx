import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Box from '@mui/material/Box';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface CallControlsProps {
    isMuted: boolean;
    isVideoOn: boolean;
    toggleVideo: () => void;
    toggleMic: () => void;
    toggleScreenShare: () => void;
    leaveCall: () => void;
    toggleSupervisorVisibility: () => void;
    isSupervisorVisible: boolean;
}

export default function CallControls({
    isMuted,
    isVideoOn,
    toggleVideo,
    toggleMic,
    toggleScreenShare,
    leaveCall,
    toggleSupervisorVisibility,
    isSupervisorVisible,
}: CallControlsProps) {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                gap: 4,
                mt: 8,
                position: 'relative',
                bottom: 40,
                backgroundColor: 'background.paper',
                borderRadius: 4,
                padding: 1.5,
                boxShadow: 3,
            }}
        >
            <IconButton onClick={toggleScreenShare} title="Share screen">
                <ScreenShareIcon />
            </IconButton>
            <IconButton onClick={toggleMic} title={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted ? <MicOffIcon color="error" /> : <MicIcon />}
            </IconButton>
            <IconButton onClick={toggleVideo} title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}>
                {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <IconButton onClick={leaveCall} title="Leave call" color="error">
                <ExitToAppIcon />
            </IconButton>

            {/* Visible supervisor toggle button */}
            <IconButton
                onClick={toggleSupervisorVisibility}
                title={isSupervisorVisible ? 'Hide supervisor' : 'Show supervisor'}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: 0,
                    width: 48,
                    height: 48,
                    zIndex: 1000,
                }}
            >
                {isSupervisorVisible ? (
                    <VisibilityIcon sx={{ color: 'white' }} />
                ) : (
                    <VisibilityOffIcon sx={{ color: 'white' }} />
                )}
            </IconButton>
        </Box>
    );
}