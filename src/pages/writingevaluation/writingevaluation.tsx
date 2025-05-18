import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
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
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import AppBar from '@mui/material/AppBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Toolbar from '@mui/material/Toolbar';
import ColorModeIconDropdown from '../../../shared-theme/ColorModeIconDropdown';
import SideMenu from './components/SideMenu';
import SideMenuMobile from './components/SideMenuMobile';
import MenuButton from './components/MenuButton';
import AppTheme from '../../../shared-theme/AppTheme';

const drawerWidth = 240;

export default function WritingEvaluation(props: { disableCustomTheme?: boolean }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [evaluation, setEvaluation] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(null);
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    severity: 'error' | 'success' | 'warning';
    message: string;
  }>({ open: false, severity: 'error', message: '' });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePostEvaluation = () => {
    if (
      companyName.trim() === 'company_i_already_evaluated@gmail.com' ||
      companyName.trim() === 'Company I Already Evaluated'
    ) {
      setSnackbar({
        open: true,
        severity: 'warning',
        message: 'You have already evaluated this company.',
      });
      return;
    }
    if (!title.trim()) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please fill in the Evaluation Title field',
      });
    } else if (!companyName.trim()) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please fill in the Company Name/Email field',
      });
    } else if (!evaluation.trim()) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Evaluation is empty, please write something.',
      });
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRating(null);
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Evaluation posted successfully.',
    });
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitRating = () => {
    handleCloseDialog();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <SideMenu />
        <AppBar
          position="fixed"
          sx={{
            display: { xs: 'auto', md: 'none' },
            boxShadow: 0,
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
            top: 'var(--template-frame-height, 0px)',
          }}
        >
          <Toolbar variant="regular">
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                flexGrow: 1,
                width: '100%',
                gap: 1,
              }}
            >
              <Typography variant="h4" component="h1" sx={{ color: 'text.primary', mr: 'auto' }}>
                Write Evaluation
              </Typography>
              <ColorModeIconDropdown />
              <MenuButton aria-label="menu" onClick={handleDrawerToggle}>
                <MenuRoundedIcon />
              </MenuButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <SideMenuMobile open={mobileOpen} toggleDrawer={(newOpen: boolean) => () => setMobileOpen(newOpen)} />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: { xs: 0, md: `${drawerWidth}px` },
          })}
        >
          <Stack
            spacing={2}
            sx={{
              width: '100%',
              maxWidth: '800px',
              height: '100vh',
              pt: { xs: 8, md: 4 },
              px: 3,
              pb: 3,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: 'calc(100vh - 100px)',
                backgroundColor: 'background.paper',
                borderRadius: 1,
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, color: 'text.primary' }}>
                Write an Internship Evaluation
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
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    height: '100%',
                    alignItems: 'flex-start',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    height: '100% !important',
                    overflow: 'auto !important',
                  },
                }}
                variant="outlined"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handlePostEvaluation}
                  sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
                >
                  Post Evaluation
                </Button>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
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
              onClick={handleCloseDialog}
              sx={{ position: 'absolute', right: 8, top: 8, color: 'text.secondary' }}
              ></IconButton>

              <CloseIcon />
            </DialogTitle>
          <DialogContent sx={{ backgroundColor: 'background.paper', pt: 1 }}>
            <Typography sx={{ mb: 2, color: 'text.primary' }}>
              How much would you recommend this internship to other students?
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
                <CheckCircleOutline sx={{ fontSize: 20, color: '#fff' }} />
              ) : snackbar.severity === 'warning' ? (
                <WarningRoundedIcon sx={{ fontSize: 20, color: '#fff' }} />
              ) : (
                <ErrorOutline sx={{ fontSize: 20, color: '#fff' }} />
              )}
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
              {snackbar.message}
            </Box>
          </Box>
        </Snackbar>
      </Box>
    </AppTheme>
  );
}