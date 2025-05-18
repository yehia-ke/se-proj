import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface VideoCallScreenProps {
  isSwapped: boolean;
  isCameraOn: boolean;
  isScreenSharing: boolean;
  localVideoRef: React.RefObject<HTMLVideoElement>;
  screenShareRef: React.RefObject<HTMLVideoElement>;
  isSupervisorVisible: boolean;
  onSwap: () => void;
}

const commonStyles = {
  container: {
    position: 'absolute',
    transition: 'all 0.3s ease',
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: 3,
    cursor: 'pointer',
    backgroundColor: 'background.default',
    border: '1px solid',
    borderColor: 'divider',
  },
  title: {
    position: 'absolute',
    top: 8,
    left: 8,
    color: 'common.white',
    zIndex: 1,
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
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

export default function VideoCallScreen({
  isSwapped,
  isCameraOn,
  isScreenSharing,
  localVideoRef,
  screenShareRef,
  isSupervisorVisible,
  onSwap,
}: VideoCallScreenProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '72vh',
        width: '96vw',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      {/* Intern Video - Always visible */}
      <Box
        sx={{
          ...commonStyles.container,
          width: '100%',
          height: '100%',
          ...(isSupervisorVisible && {
            top: isSwapped ? '68%' : 0,
            left: isSwapped ? '74%' : 0,
            width: isSwapped ? '25%' : '100%',
            height: isSwapped ? '30%' : '100%',
            zIndex: isSwapped ? 2 : 1,
          }),
        }}
        onClick={onSwap}
      >
        <Box sx={commonStyles.onlineBadge}>
          <FiberManualRecordIcon fontSize="small" sx={{ color: 'limegreen' }} />
          <Typography variant="caption">Online</Typography>
        </Box>

        {(isCameraOn || isScreenSharing) ? (
          <video
            ref={isScreenSharing ? screenShareRef : localVideoRef}
            autoPlay
            muted={isScreenSharing}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: isScreenSharing ? 'none' : 'scaleX(-1)',
              backgroundColor: 'black',
            }}
          />
        ) : (
          <Box sx={commonStyles.placeholder}>
            <Typography variant="h6" color="text.secondary">
              Feed 1
            </Typography>
          </Box>
        )}
      </Box>

      {/* Supervisor Video - Conditionally rendered */}
      {isSupervisorVisible && (
        <Box
          sx={{
            ...commonStyles.container,
            top: isSwapped ? 0 : '68%',
            left: isSwapped ? 0 : '74%',
            width: isSwapped ? '100%' : '25%',
            height: isSwapped ? '100%' : '30%',
            zIndex: isSwapped ? 1 : 2,
          }}
          onClick={onSwap}
        >
          <Box sx={commonStyles.onlineBadge}>
            <FiberManualRecordIcon fontSize="small" sx={{ color: 'limegreen' }} />
            <Typography variant="caption">Online</Typography>
          </Box>
          <Box sx={commonStyles.placeholder}>
            <Typography variant="h6" color="text.secondary">
              Feed 2
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}