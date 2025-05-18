let setNotifications: React.Dispatch<React.SetStateAction<{ id: number; message: string }[]>> | null = null;

export function setSetNotifications(setter: React.Dispatch<React.SetStateAction<{ id: number; message: string }[]>>) {
  setNotifications = setter;
}

export function addNotification(message: string) {
  if (setNotifications) {
    setNotifications((prevNotifications) => {
      const maxId = prevNotifications.length > 0 
        ? Math.max(...prevNotifications.map(n => n.id)) 
        : 0;
      const newId = maxId + 1;
      const newNotification = { id: newId, message };
      return [...prevNotifications, newNotification];
    });
  } else {
    console.error('setNotifications is not set');
  }
}