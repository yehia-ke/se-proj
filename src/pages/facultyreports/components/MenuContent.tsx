import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import WorkIcon from '@mui/icons-material/Work';
import FaceIcon from '@mui/icons-material/Face';
import DescriptionIcon from '@mui/icons-material/Description';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, href: '/facultydashboard' },
  { text: 'Reports & Evaluations', icon: <DescriptionIcon />, href: '/facultydashboard/reports' },

];

const secondaryListItems = [
  { text: 'About', icon: <InfoRoundedIcon />, href: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, href: '/feedback' },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === 1} component="a" href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton component="a" href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}