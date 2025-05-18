import * as React from 'react';
import Menu from '@mui/material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import MenuButton from './MenuButton';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { listClasses } from '@mui/material/List';
import { paperClasses } from '@mui/material/Paper';
import Badge from '@mui/material/Badge';

export default function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = React.useState<{ id: number; message: string }[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <React.Fragment>
      <MenuButton
        aria-label="Open notifications"
        onClick={handleClick}
        sx={{ borderColor: 'transparent' }}
      >
        <Badge color="error" variant="dot" invisible={notifications.length === 0}>
          <NotificationsRoundedIcon />
        </Badge>
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: '4px',
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
            width: '500px',
          },
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 16px',
                }}
              >
                <ListItemText
                  primary={notification.message}
                  sx={{
                    marginRight: '16px',
                    flex: '1 1 auto',
                    '& .MuiTypography-root': {
                      overflowWrap: 'break-word',
                    },
                  }}
                />
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                  }}
                >
                  <IconButton onClick={() => handleDelete(notification.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <ListItem sx={{ padding: '8px 16px' }}>
            <ListItemText primary="Notification free!" />
          </ListItem>
        )}
      </Menu>
    </React.Fragment>
  );
}