import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ColorModeIconDropdown from '../../../../shared-theme/ColorModeIconDropdown';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import NotificationsMenu from './NotificationsMenu';

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { md: 'flex' },
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '2000px' },
        mt: { xs: '0 !important', md: '16px !important' },  // Add this line
        pt: 2,  // Increased top padding
        px: 4,  // Increased horizontal padding
        pb: 2,  // Increased bottom padding if needed
        backgroundColor: 'background.paper',
        boxShadow: 3, // Elevation/shadow effect
        borderBottom: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        position: 'relative'
         
        
      }}
    >
      {/* Left Section: Title and Icon */}
      <Stack direction="row" spacing={1} alignItems="center">
        <VideoCameraFrontIcon color="primary" />
        <Typography variant="h6" color="text.primary">
          Live Workshop
        </Typography>
      </Stack>

      {/* Right Section: Theme Toggle */}
      <ColorModeIconDropdown />
    </Stack>
  );
}
