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
}

export default function DialogueButtons({ buttons }: DialogueButtonsProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      {buttons.map((button, index) => (
        <IconButton
          key={index}
          onClick={button.onClick}
          aria-label={button.ariaLabel}
          sx={{
            backgroundColor: 'white',
            borderRadius: '50%',
            '&:hover': { backgroundColor: 'white' },
          }}
        >
          {button.icon}
        </IconButton>
      ))}
    </Stack>
  );
}