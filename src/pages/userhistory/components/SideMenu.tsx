import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
});

export default function SideMenu() {
  const location = useLocation();
  const isProUser = location.pathname.endsWith('/history/pro');

  // Optionally, get the number of internship months dynamically
  const internshipMonths = 3; // Replace with your dynamic value if needed

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
          overflowX: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Avatar
          sizes="small"
          alt="John Doe"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto', width: 'calc(100% - 36px - 40px)' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
              John Doe
            </Typography>
            {isProUser && (
              <Tooltip title={`Completed ${internshipMonths} month${internshipMonths > 1 ? 's' : ''} in internships`}>
                <EmojiEventsIcon sx={{ fontSize: 18, color: 'gold' , ml:16 }} />
              </Tooltip>
            )}
          </Stack>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
              width: '100%',
            }}
          >
            john.doe@student.guc.edu.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
