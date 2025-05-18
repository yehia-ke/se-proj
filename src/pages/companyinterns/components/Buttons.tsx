import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

interface ButtonConfig {
  icon: React.ReactElement;
  onClick: (event: React.MouseEvent) => void;
  ariaLabel: string;
  size: 'small' | 'large';
  disabled?: boolean;
}

interface ButtonsProps {
  buttons: ButtonConfig[];
  sx?: React.CSSProperties | Record<string, any>;
}

export default function Buttons({ buttons, sx }: ButtonsProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', ...sx }}>
      {buttons.map((button, index) => (
        <IconButton
          key={index}
          onClick={button.onClick}
          aria-label={button.ariaLabel}
          size={button.size}
          sx={{
            backgroundColor: 'white',
            borderRadius: '50%',
            '&:hover': { backgroundColor: 'white' },
          }}
          disabled ={button.disabled || false}
        >
          {button.icon}
        </IconButton>
      ))}
    </Stack>
  );
}