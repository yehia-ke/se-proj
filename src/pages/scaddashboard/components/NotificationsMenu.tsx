import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
import Button from '@mui/material/Button';

type Notification = {
  id: number;
  message: string;
  type?: 'videoCall' | 'default';
};

export default function NotificationsMenu() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const [notifications, setNotifications] = React.useState<Notification[]>([
    { id: 1, message: 'New internship application received for review.', type: 'default' },
    { id: 2, message: 'Internship candidate has submitted an appeal regarding their rejection. Review the appeal details.', type: 'default' },
    { id: 3, message: 'Internship evaluation for student John Doe is now available for your feedback.', type: 'default' },
    { id: 5, message: 'Internship status for candidate Alex Johnson has been updated to "Accepted".', type: 'default' },
    { id: 6, message: 'New rejection comment has been added for internship applicant Emily Clark.', type: 'default' },
    { id: 7, message: 'Incoming video call from Intern', type: 'videoCall' },
  ]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleAcceptVideoCall = (id: number) => {
    console.log('Video call accepted for notification ID:', id);
    navigate('/videocallpageScad'); // Navigate to the video call page
    handleDelete(id);
    handleClose();
  };

  const handleDeclineVideoCall = (id: number) => {
    console.log('Video call declined for notification ID:', id);
    handleDelete(id);
    handleClose();
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
                <ListItemIcon sx={{ minWidth: 'auto', display: 'flex', gap: 1 }}>
                  {notification.type === 'videoCall' ? (
                    <>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAcceptVideoCall(notification.id)}
                        sx={{ marginRight: '8px' }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDeclineVideoCall(notification.id)}
                      >
                        Decline
                      </Button>
                    </>
                  ) : (
                    <IconButton onClick={() => handleDelete(notification.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
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
