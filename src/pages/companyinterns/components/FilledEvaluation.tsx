import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import AppTheme from '../../../../shared-theme/AppTheme';

interface EvaluationDialogueProps {
  disableCustomTheme?: boolean;
  internName?: string;
  open: boolean;
  onClose: () => void;
}

export default function EvaluationDialogue({
  disableCustomTheme,
  internName: initialinternName = '',
  open,
  onClose,
}: EvaluationDialogueProps) {
  const [title, setTitle] = React.useState('Frontend Development Internship Review');
  const [internName, setinternName] = React.useState('');
  const [evaluation, setEvaluation] = React.useState(
    'During my internship, I gained hands-on experience with React, TypeScript, and modern web development practices. The team was supportive and provided excellent mentorship. I worked on several key projects including the redesign of the intern\'s dashboard interface and implementing new features for their client portal. The work environment was collaborative and I learned a great deal about agile development practices. This internship significantly improved my technical skills and professional development.'
  );
  const [openRatingDialog, setOpenRatingDialog] = React.useState(false);
  const [openSaveDraftDialog, setOpenSaveDraftDialog] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(null);
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    severity: 'error' | 'success' | 'warning';
    message: string;
  }>({ open: false, severity: 'error', message: '' });

  React.useEffect(() => {
    setinternName(initialinternName || 'GrowEasy Solutions');
  }, [initialinternName]);

  const handlePostEvaluation = () => {
    if (
      internName.trim() === 'intern_i_already_evaluated@gmail.com' ||
      internName.trim() === 'intern I Already Evaluated'
    ) {
      setSnackbar({
        open: true,
        severity: 'warning',
        message: 'You have already evaluated this intern.',
      });
      return;
    }
    if (!title.trim()) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please fill in the Title field',
      });
    } else if (!internName.trim()) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please fill in the intern Name/Email field',
      });
    } else if (!evaluation.trim()) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Evaluation is empty, please write something.',
      });
    } else {
      setOpenRatingDialog(true);
    }
  };

  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false);
    setRating(null);
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitRating = () => {
    handleCloseRatingDialog();
    onClose();
    setTitle('');
    setinternName('');
    setEvaluation('');
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Evaluation posted successfully.',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', { internName, title, evaluation });
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Draft saved successfully.',
    });
    setOpenSaveDraftDialog(false);
    onClose();
  };

  const handleDeleteDraft = () => {
    setinternName(initialinternName);
    setTitle('');
    setEvaluation('');
    setOpenSaveDraftDialog(false);
    onClose();
  };

  const handleClose = () => {
    if (title.trim() !== '' || evaluation.trim() !== '') {
      setOpenSaveDraftDialog(true);
    } else {
      onClose();
    }
  };

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline enableColorScheme />
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogContent
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: 'background.paper',
          }}
        >
          <Stack
            spacing={2}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, color: 'text.primary' }}>
              Write a intern Evaluation
            </Typography>
            <TextField
              placeholder="Enter intern name or email..."
              value={internName}
              onChange={(e) => setinternName(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                },
              }}
              variant="outlined"
              size="small"
            />
            <TextField
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                },
              }}
              variant="outlined"
              size="small"
            />
            <TextField
              placeholder="Write your evaluation here..."
              value={evaluation}
              onChange={(e) => setEvaluation(e.target.value)}
              multiline
              sx={{
                flex: 1,
                minHeight: '400px',
                mb: 3,
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{ color: 'text.primary', borderColor: 'divider' }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={handlePostEvaluation}
                sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
              >
                Post Evaluation
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openSaveDraftDialog}
        onClose={() => setOpenSaveDraftDialog(false)}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            border: 0,
            boxShadow: 'none',
            elevation: 0,
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          Save Draft?
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          <DialogContentText sx={{ color: 'text.primary' }}>
            Do you want to save your draft?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'background.paper', border: 0 }}>
          <Button
            onClick={handleDeleteDraft}
            variant="outlined"
            sx={{ color: 'text.primary', borderColor: 'divider' }}
          >
            Delete it Forever
          </Button>
          <Button
            onClick={handleSaveDraft}
            variant="contained"
            sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
          >
            Save it for Later
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRatingDialog}
        onClose={handleCloseRatingDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            border: 0,
            boxShadow: 'none',
            elevation: 0,
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          Rate Your Internship
          <IconButton
            aria-label="close"
            onClick={handleCloseRatingDialog}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'background.paper', pt: 1 }}>
          <Typography sx={{ mb: 2, color: 'text.primary' }}>
            How much would you recommend this intern to other students?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Box
                key={value}
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: `2px solid ${rating === value ? theme.palette.primary.main : theme.palette.grey[500]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backgroundColor: rating === value ? theme.palette.primary.light : 'transparent',
                  '&:hover': { backgroundColor: theme.palette.grey[100] },
                })}
                onClick={() => handleRatingClick(value)}
              >
                <Typography sx={{ color: 'text.primary' }}>{value}</Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'background.paper', border: 0 }}>
          {rating !== null && (
            <Button
              onClick={handleSubmitRating}
              variant="contained"
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ transform: 'translateY(-20px)' }}
      >
        <Box
          sx={{
            minWidth: 300,
            backgroundColor:
              snackbar.severity === 'success'
                ? '#2e7d32'
                : snackbar.severity === 'warning'
                ? '#f57c00'
                : '#d32f2f',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '4px',
            boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            minHeight: 48,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            {snackbar.severity === 'success' ? (
              <CheckCircleOutline sx={{ fontSize: 20, color: 'white' }} />
            ) : snackbar.severity === 'warning' ? (
              <WarningRoundedIcon sx={{ fontSize: 20, color: 'white' }} />
            ) : (
              <ErrorOutline sx={{ fontSize: 20, color: 'white' }} />
            )}
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
            {snackbar.message}
          </Box>
        </Box>
      </Snackbar>
    </AppTheme>
  );
}