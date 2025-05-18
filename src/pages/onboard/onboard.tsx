import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../../shared-theme/AppTheme';
import ColorModeIconDropdown from '../../../shared-theme/ColorModeIconDropdown';
import SitemarkIcon from './components/CustomIcons';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function OnboardPage(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [industry, setIndustry] = React.useState('');
  const [industryError, setIndustryError] = React.useState(false);
  const [size, setSize] = React.useState('');
  const [sizeError, setSizeError] = React.useState(false);
  const [file1, setFile1] = React.useState<File | null>(null);
  const [file1Error, setFile1Error] = React.useState(false);
  const [files2, setFiles2] = React.useState<File[]>([]);
  const [files2Error, setFiles2Error] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');

  const handleindustryChange = (event: SelectChangeEvent) => {
    setIndustry(event.target.value as string);
    setIndustryError(false);
  };
  
  const handlesizeChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
    setSizeError(false);
  };

  const handleFile1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile1(event.target.files[0]);
      setFile1Error(false);
    }
  };

  const handleFiles2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles2(Array.from(event.target.files));
      setFiles2Error(false);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!industry) {
      setIndustryError(true);
      isValid = false;
    }

    if (!size) {
      setSizeError(true);
      isValid = false;
    }

    if (!file1) {
      setFile1Error(true);
      isValid = false;
    }

    if (files2.length === 0) {
      setFiles2Error(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateInputs();
    
    if (isValid) {
      setIsLoading(true);
      setSubmitMessage('An email will be sent upon acceptance or declination of your registration.');
      
      setTimeout(() => {
        setIsLoading(false);
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeIconDropdown sx={{float: 'right', marginTop: 2, marginRight: 2 }} />
      <IconButton
            sx={{ position: 'absolute', top: 60, right: 16 }}
            size="small"
            href="/">
              <HomeFilledIcon />
            </IconButton>
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Company Name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Saba7 El5eir Inc."
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Official Company Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="company@company.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl error={industryError}>
              <FormLabel>Industry</FormLabel>
              <Select
                value={industry}
                label="Industry"
                onChange={handleindustryChange}
                error={industryError}
              >
                <MenuItem value={1}>Technology</MenuItem>
                <MenuItem value={2}>Finance</MenuItem>
                <MenuItem value={3}>Healthcare</MenuItem>
                <MenuItem value={4}>Education</MenuItem>
                <MenuItem value={5}>Other</MenuItem>
              </Select>
              {industryError && <Typography color="error" variant="caption">Industry is required</Typography>}
            </FormControl>
            <FormControl fullWidth error={sizeError}>
              <FormLabel>Size</FormLabel>
              <Select
                value={size}
                label="Size"
                onChange={handlesizeChange}
                error={sizeError}
              >
                <MenuItem value={1}>Small (50 employees or less)</MenuItem>
                <MenuItem value={2}>Medium (51-100 employees)</MenuItem>
                <MenuItem value={3}>Large (101-500 employees)</MenuItem>
                <MenuItem value={4}>Corporate (more than 500 employees)</MenuItem>
              </Select>
              {sizeError && <Typography color="error" variant="caption">Size is required</Typography>}
            </FormControl>
            <Divider />
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              color={file1Error ? 'error' : 'primary'}
            >
              {file1 ? file1.name : 'Upload Company Logo'}
              <VisuallyHiddenInput
                type="file"
                onChange={handleFile1Change}
                required
              />
            </Button>
            {file1Error && <Typography color="error" variant="caption">File 1 is required</Typography>}
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              color={files2Error ? 'error' : 'primary'}
            >
              {files2.length > 0 
                ? `${files2.length} file(s) selected` 
                : 'Upload verification documents'} 
              <VisuallyHiddenInput
                type="file"
                onChange={handleFiles2Change}
                multiple
                required
              />
            </Button>
            {files2Error && <Typography color="error" variant="caption">At least one file is required</Typography>}
            {submitMessage && (
              <Typography color="primary" variant="body2" sx={{ textAlign: 'center' }}>
                {submitMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Sign up'}
            </Button>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/login"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
              Not a Company?{' '}
              <Link
                href="/useronboard"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Register Here
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}