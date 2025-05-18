import React from 'react';
import { styled, useTheme, keyframes } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Avatar,
  IconButton,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { useNavigate } from 'react-router-dom';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const AnimatedAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  margin: '20px auto',
  backgroundColor: theme.palette.success.main,
  animation: `${pulse} 2s infinite`,
  '& .MuiSvgIcon-root': {
    fontSize: '2.5rem',
  },
}));

const DeclineButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  width: 56,
  height: 56,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const AcceptButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  width: 56,
  height: 56,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

interface CallInScreenProps {
  open: boolean;
  onClose: () => void;
  caller: string;
}

const CallInScreen: React.FC<CallInScreenProps> = ({ open, onClose, caller }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate('/VideoCallPageScad');
  };

  const handleDecline = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDecline}
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'transparent',
          borderRadius: 4,
          border: 'none',
          boxShadow: 'none',
          width: '20vw',
          maxWidth: 'none',
          padding: 0,
          textAlign: 'center',
        },
      }}
    >
      <DialogTitle
        sx={{
          color: 'text.primary',
          backgroundColor: 'background.paper',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          userSelect: 'none',
        }}
      >
        Incoming Call
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: 'background.paper' }}>
        <AnimatedAvatar>
          <CallIcon />
        </AnimatedAvatar>

        <Typography
          variant="h6"
          sx={{ mt: 1, fontWeight: 600, color: theme.palette.text.primary }}
        >
          {caller}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, userSelect: 'none' }}
        >
          Intern is calling you
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <DeclineButton aria-label="decline call" onClick={handleDecline}>
            <CallEndIcon sx={{ fontSize: 28 }} />
          </DeclineButton>

          <AcceptButton aria-label="accept call" onClick={handleAccept}>
            <CallIcon sx={{ fontSize: 28 }} />
          </AcceptButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CallInScreen;
