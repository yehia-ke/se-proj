import * as React from 'react';
import Alert from '@mui/material/Alert';

export function CustomAlert({ severity, color, children, ...props }) {
  return (
    <Alert variant="outlined" severity={severity} color={color} {...props}>
      {children}
    </Alert>
  );
}