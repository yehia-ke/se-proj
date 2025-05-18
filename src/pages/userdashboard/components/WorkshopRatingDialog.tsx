import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useNotifications } from './NotificationsContext';

interface WorkshopRatingDialogProps {
  open: boolean;
  workshopName: string;
  notificationId: number; // Added notificationId prop
  onClose: () => void;
  onSubmit: (rating: number | null, feedback: string) => void;
}

export default function WorkshopRatingDialog({
  open,
  workshopName,
  notificationId,
  onClose,
  onSubmit,
}: WorkshopRatingDialogProps) {
  const [rating, setRating] = React.useState<number | null>(null);
  const [feedback, setFeedback] = React.useState('');
  const { removeNotification } = useNotifications();

  const handleSubmit = () => {
    onSubmit(rating, feedback);
    removeNotification(notificationId); // Remove the notification
    setRating(null);
    setFeedback('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'background.paper',
          minWidth: '400px',
        },
      }}
    >
      <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
        Rate "{workshopName}"
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ backgroundColor: 'background.paper' }}>
        <Typography sx={{ color: 'text.primary', mb: 2 }}>
          Please provide your rating and feedback for the workshop.
        </Typography>
        <Typography sx={{ color: 'text.primary', mb: 1 }}>Rating:</Typography>
        <Rating
          name="workshop-rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          size="large"
        />
        <Typography sx={{ color: 'text.primary', mt: 2, mb: 1 }}>Feedback:</Typography>
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'background.default',
            borderRadius: '4px',
            border: '1px solid',
            borderColor: 'grey.400',
            '&:hover': {
              borderColor: 'grey.600',
            },
            '&:focus-within': {
              borderColor: 'primary.main',
              boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.light}`,
            },
          }}
        >
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about the workshop..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '8px',
              border: 'none',
              background: 'transparent',
              resize: 'vertical',
              fontFamily: 'inherit',
              fontSize: '1rem',
              color: 'inherit',
              outline: 'none',
            }}
          />
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ backgroundColor: 'background.paper' }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="error"
          sx={{ 
            backgroundColor: 'error.main',
            borderColor: 'error.main',
            '&:hover': {
              backgroundColor: 'error.dark',
              borderColor: 'error.dark',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={rating === null}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}