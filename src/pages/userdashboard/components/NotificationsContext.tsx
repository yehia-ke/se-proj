import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Notification {
  id: number;
  message: string;
  type?: 'live' | 'vod' | 'apply' | 'videoCall';
  workshopId?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: number) => void;
  handleVideoCallResponse?: (accepted: boolean) => void;
}

const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPro = location.pathname.includes('/pro');

  const [notifications, setNotifications] = React.useState<Notification[]>(() => {
    const baseNotifications: Notification[] = [
      { id: 1, message: 'Your application to Google has been viewed.'},
      { id: 2, message: 'You have been shortlisted for the internship at Microsoft.'},
      { id: 3, message: 'Don’t forget to submit your weekly progress report.'},
      { id: 4, message: '✅ Your Internship report status has been set'},
    ];

    if (isPro) {
      baseNotifications.push(
        { id: 5, message: 'Workshop is live now!', type: 'live' },
        { id: 6, message: 'Workshop VOD available!', type: 'vod' },
        { id: 7, message: 'Your appointment has been accepted'},
        { id: 8, message: '📞 Incoming video call from your supervisor', type: 'videoCall' }
      );
    }

    return baseNotifications;
  });

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    setNotifications((prev) => [
      ...prev,
      { ...notification, id: Math.max(...prev.map((n) => n.id), 0) + 1 },
    ]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleVideoCallResponse = (accepted: boolean) => {
    if (accepted) {
      navigate('/videocallpage');
    }
    removeNotification(7);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        handleVideoCallResponse,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
