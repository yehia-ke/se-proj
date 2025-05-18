import * as React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Fab,
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WorkIcon from '@mui/icons-material/Work';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useParams } from 'react-router-dom';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ConstructionIcon from '@mui/icons-material/Construction';

const mainListItems = [   
  { text: 'Home', icon: <HomeRoundedIcon />, href: '/userdashboard' },   
  { text: 'Internships', icon: <WorkIcon />, href: '/userdashboard/internship' },   
  { text: 'History', icon: <AccessTimeFilledIcon />, href: '/userdashboard/history' },
  { text: 'Workshops', icon: <ConstructionIcon />, href: '/workshop/vod' }];
const secondaryListItems = [
  { text: 'About', icon: <InfoRoundedIcon />, href: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, href: '/feedback' },
];

const MenuContent = () => {
  const [isProStudent, setIsProStudent] = React.useState(false);
  const { status } = useParams();
  const navigate = useNavigate();

  // Set initial status based on URL
  React.useEffect(() => {
    if (status === 'pro') {
      setIsProStudent(true);
    } else {
      setIsProStudent(false);
    }
  }, [status]);

  // Handle toggle and navigation
const handleToggleStatus = () => {
  const newStatus = isProStudent ? 'regular' : 'pro';
  setIsProStudent(!isProStudent);
};

  const waveAnimationSpeed = isProStudent ? '3s' : '6s';

  const styles = {
    fabButton: {
      position: 'relative',
      color: 'white',
      boxShadow: 'none',
      transition: 'all 0.5s ease-in-out',
      '&:hover': {
        boxShadow: '0 0 12px 4px rgba(255, 215, 0, 0.7)',
        transform: 'scale(1.1)',
      },
      background: 'linear-gradient(45deg, #0a0e1c, #003366, #0a0e1c)',
      backgroundSize: '400% 400%',
      animation: `waveMotion ${waveAnimationSpeed} ease-in-out infinite`,
    },
    starIconHover: {
      color: '#ffdd00',
    },
  };

  return (
    <Stack
      sx={{
        flexGrow: 1,
        p: 1,
        justifyContent: 'space-between',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Main List Items */}
      <List dense>
              {mainListItems.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton selected={index==3} component="a" href={item.href}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

      {/* FAB Button */}
      <Stack sx={{ display: 'flex', justifyContent: 'center', p: 2, mt: 'auto' }}>
        <Fab
          size="small"
          variant="extended"
          sx={[styles.fabButton, { animationDuration: waveAnimationSpeed }]}
          onClick={handleToggleStatus}
        >
          <StarIcon sx={[{ mr: 1 }, isProStudent && styles.starIconHover]} />
          {isProStudent ? 'Pro Student' : 'Become Pro'}
        </Fab>
      </Stack>

      {/* Secondary List Items */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component="a"
              href={item.href}
              sx={{ color: 'text.primary', '&:hover': { backgroundColor: 'primary.main' } }}
            >
              <ListItemIcon sx={{ color: 'text.primary' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default MenuContent;
