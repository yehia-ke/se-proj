import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

interface MenuButtonProps extends IconButtonProps {
  showBadge?: boolean;
}

const IconButton = styled(MuiIconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
}));

export default function MenuButton({ showBadge = false, ...props }: MenuButtonProps) {
  if (showBadge) {
    return (
      <Badge color="error" variant="dot">
        <IconButton {...props} />
      </Badge>
    );
  }
  return <IconButton {...props} />;
}
