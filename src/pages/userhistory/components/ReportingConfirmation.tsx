import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ReportingConfirmationProps {
  open: boolean;
  onClose: () => void;
  companyName: string;
}

export default function ReportingConfirmation({ open, onClose, companyName }: ReportingConfirmationProps) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleReport = () => {
    // Show snackbar and close dialog
    setOpenSnackbar(true);
    onClose();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="report-dialog-title"
        aria-describedby="report-dialog-description"
      >
        <DialogTitle sx={{backgroundColor: 'background.paper'}}>
          Report {companyName}?
        </DialogTitle>
        <DialogContent sx={{backgroundColor: 'background.paper'}}>
          <DialogContentText sx={{backgroundColor: 'background.paper'}}>
            Reporting the company without a valid reason would result in the student's suspension or worse punishments.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{backgroundColor: 'background.paper'}}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleReport}
            variant="contained"
            sx={{ 
              backgroundColor: '#8B0000 !important',
              '&.MuiButton-contained': {
                backgroundColor: '#8B0000 !important',
              },
              '&:hover': {
                backgroundColor: '#8B0000 !important',
              }
            }}
            autoFocus
          >
            Report
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'rgb(24, 161, 0)',
            px: 2,
            py: 1.5,
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <CheckCircleIcon sx={{ color: 'white' }} />
          <Box component="span" sx={{ color: 'white', fontWeight: 500 }}>
            Company reported successfully
          </Box>
        </Box>
      </Snackbar>
    </>
  );
}