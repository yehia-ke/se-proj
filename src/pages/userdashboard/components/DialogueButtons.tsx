import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

interface ButtonConfig {
  icon: React.ReactElement;
  onClick: (event: React.MouseEvent) => void;
  ariaLabel: string;
}

interface DialogueButtonsProps {
  buttons: ButtonConfig[];
  sx?: any; // Add sx prop support
}

export default function DialogueButtons({ buttons, sx }: DialogueButtonsProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      {buttons.map((button, index) => (
        <IconButton
          key={index}
          onClick={button.onClick}
          aria-label={button.ariaLabel}
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: 1,
            padding: '8px',
            '&:hover': { backgroundColor: 'primary.dark' },
            ...sx?.['& .MuiIconButton-root'],
          }}
        >
          {button.icon}
        </IconButton>
      ))}
    </Stack>
  );
}