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
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { useNotifications } from './NotificationsContext';
import WorkshopRatingDialog from './WorkshopRatingDialog';

export default function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { notifications, removeNotification, addNotification, handleVideoCallResponse } = useNotifications();
  const [ratingDialogOpen, setRatingDialogOpen] = React.useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = React.useState<{
    id: number;
    name: string;
    notificationId: number;
  } | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: number) => {
    removeNotification(id);
  };

  const handleJoinLive = () => {
    navigate('/workshop/live');
    handleClose();
  };

  const handleWatchVOD = () => {
    navigate('/workshop/vod');
    handleClose();
  };

  const handleWatchNow = (notificationId: number, workshopId?: number, workshopName?: string) => {
    if (workshopId && workshopName) {
      removeNotification(notificationId);
      addNotification({
        message: `Congratulations on finishing "${workshopName}"! You have now earned a certificate of attendance.`,
        type: 'certificate',
        workshopId,
      });
    }
    handleClose();
  };

  const handleRateWorkshop = (notificationId: number, workshopId: number, workshopName: string) => {
    setSelectedWorkshop({ id: workshopId, name: workshopName, notificationId });
    setRatingDialogOpen(true);
  };

  const handleRatingSubmit = (rating: number | null, feedback: string) => {
    if (rating && selectedWorkshop) {
      console.log(
        `Submitted rating for workshop ID ${selectedWorkshop.id}: ${rating} stars, Feedback: ${feedback}`
      );
    }
  };

  const handleRatingDialogClose = () => {
    setRatingDialogOpen(false);
    setSelectedWorkshop(null);
  };

  // New handlers for Accept and Decline buttons
  const handleAcceptVideoCall = () => {
    handleVideoCallResponse?.(true);
    handleClose();
  };

  const handleDeclineVideoCall = () => {
    removeNotification(7); // Remove notification with ID 7
    handleClose();
  };

  return (
    <React.Fragment>
      <MenuButton
        aria-label="Open notifications"
        onClick={handleClick}
        sx={{ borderColor: 'transparent' }}
      >
        <Badge color="error" variant="dot" invisible={!notifications || notifications.length === 0}>
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
      >
        {notifications && notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px' }}>
                <ListItemText
                  primary={notification.message}
                  sx={{ marginRight: '16px', flex: '1 1 auto', '& .MuiTypography-root': { overflowWrap: 'break-word' } }}
                />
                <ListItemIcon sx={{ minWidth: 'auto', display: 'flex', alignItems: 'center' }}>
                  {notification.type === 'live' && (
                    <Button variant="contained" size="small" onClick={handleJoinLive} sx={{ marginRight: '8px', backgroundColor: 'none' }}>
                      Join Workshop Live
                    </Button>
                  )}
                  {notification.type === 'vod' && (
                    <Button variant="contained" size="small" onClick={handleWatchVOD} sx={{ marginRight: '8px' }}>
                      Watch VOD of Workshop
                    </Button>
                  )}
                  {notification.type === 'videoCall' && (
                    <>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleAcceptVideoCall}
                        sx={{ marginRight: '8px', backgroundColor: 'none' }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleDeclineVideoCall}
                        sx={{ marginRight: '8px' }}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  {notification.type === 'apply' && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        handleWatchNow(notification.id, notification.workshopId, notifications.find((n) => n.id === notification.id)?.message?.match(/"([^"]+)"/)?.[1])
                      }
                      sx={{ marginRight: '8px' }}
                    >
                      Watch Now
                    </Button>
                  )}
                  {notification.type === 'certificate' && notification.workshopId && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleRateWorkshop(notification.id, notification.workshopId!, notification.message.match(/"([^"]+)"/)?.[1] || 'Workshop')}
                      sx={{ marginRight: '8px' }}
                    >
                      Rate this Workshop
                    </Button>
                  )}
                  {notification.type !== 'videoCall' && (
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
      {selectedWorkshop && (
        <WorkshopRatingDialog
          open={ratingDialogOpen}
          workshopName={selectedWorkshop.name}
          notificationId={selectedWorkshop.notificationId}
          onClose={handleRatingDialogClose}
          onSubmit={handleRatingSubmit}
        />
      )}
    </React.Fragment>
  );
}
