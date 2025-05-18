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
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AppTheme from '../../../../shared-theme/AppTheme';
import DropdownMenu from './DropdownMenu';

interface EvaluationDialogueProps {
  disableCustomTheme?: boolean;
  companyName?: string;
  open: boolean;
  onClose: () => void;
}

export default function EvaluationDialogue({
  disableCustomTheme,
  companyName: initialCompanyName = '',
  open,
  onClose,
}: EvaluationDialogueProps) {
  const [title, setTitle] = React.useState<string[]>([]);
  const [companyName, setCompanyName] = React.useState(initialCompanyName);
  const [reportTitle, setReportTitle] = React.useState<string>('');
  const [introduction, setIntroduction] = React.useState('');
  const [body, setBody] = React.useState('');
  const [openRatingDialog, setOpenRatingDialog] = React.useState(false);
  const [openSaveDraftDialog, setOpenSaveDraftDialog] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(null);
  const [isFinalized, setIsFinalized] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    severity: 'error' | 'success' | 'warning';
    message: string;
  }>({ open: false, severity: 'error', message: '' });

  React.useEffect(() => {
    setCompanyName(initialCompanyName);
  }, [initialCompanyName]);

  const handlePostEvaluation = () => {
    if (
      companyName.trim() === 'company_i_already_reported@gmail.com' ||
      companyName.trim() === 'Company I Already Reported'
    ) {
      setSnackbar({
        open: true,
        severity: 'warning',
        message: 'You have already written a report on this internship.',
      });
      return;
    }
    if (title.length === 0) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please select at least one course',
      });
      return;
    }
    if (!companyName.trim()) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please fill in the Company Name/Email field',
      });
      return;
    }
    if (!reportTitle.trim()) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please fill in the Title field',
      });
      return;
    }
    if (!introduction.trim()) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please write an introduction.',
      });
      return;
    }
    if (!body.trim()) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please write a body.',
      });
      return;
    }
    setOpenRatingDialog(true);
  };

  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false);
    setRating(null);
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Report posted successfully.',
    });
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitRating = () => {
    handleCloseRatingDialog();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', { companyName, reportTitle, title, introduction, body });
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Draft saved successfully.',
    });
    setOpenSaveDraftDialog(false);
    onClose();
  };

  const handleDeleteDraft = () => {
    setCompanyName(initialCompanyName);
    setReportTitle('');
    setTitle([]);
    setIntroduction('');
    setBody('');
    setOpenSaveDraftDialog(false);
    onClose();
  };

  const handleClose = () => {
    if (
      reportTitle.trim() !== '' ||
      title.length > 0 ||
      introduction.trim() !== '' ||
      body.trim() !== ''
    ) {
      setOpenSaveDraftDialog(true);
    } else {
      onClose();
    }
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFinalized(event.target.checked);
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
              Write an Internship Report
            </Typography>
            <TextField
              placeholder="Enter company name or email..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
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
              placeholder="Write title here..."
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
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
            <DropdownMenu value={title} onChange={setTitle} />
            <TextField
              placeholder="Write your introduction here..."
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              multiline
              sx={{
                flex: 1,
                minHeight: '150px',
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  minHeight: '150px',
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
            <TextField
              placeholder="Write your body here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              multiline
              sx={{
                flex: 1,
                minHeight: '200px',
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  minHeight: '200px',
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isFinalized}
                    onChange={handleSwitchChange}
                    color="primary"
                  />
                }
                label={isFinalized ? 'Finalized' : 'Unfinalized'}
                sx={{ color: 'text.primary' }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
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
                  Post Report
                </Button>
              </Box>
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
            To what extent would you consider your internship to have been valuable or impactful?
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
                  backgroundColor: rating === value ? '#ffffff' : 'transparent',
                  '&:hover': { backgroundColor: theme.palette.grey[500] },
                  '& .MuiTypography-root': {
                    color: rating === value ? '#000000' : 'text.primary',
                  },
                })}
                onClick={() => handleRatingClick(value)}
              >
                <Typography>{value}</Typography>
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
                  backgroundColor: 'grey.500',
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