import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from '../../../shared-theme/AppTheme';
import SignInCard from './components/SignInCard';
import Content from './components/Content';
import ColorModeIconDropdown from '../../../shared-theme/ColorModeIconDropdown';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import IconButton, { IconButtonOwnProps } from '@mui/material/IconButton';

export default function LoginPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeIconDropdown sx={{ position: 'absolute', top: 16, right: 16 }} />
      <IconButton
      sx={{ position: 'absolute', top: 60, right: 16 }}
      size="small"
      href="/">
        <HomeFilledIcon />
      </IconButton>
      
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: 2,
            boxSizing: 'border-box',
          },
          (theme) => ({
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
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 6, sm: 12 },
            width: '100%',
            maxWidth: 1200,
            margin: 'auto',
          }}
        >
          <Content />
          <SignInCard />
        </Stack>
      </Stack>
    </AppTheme>
  );
}