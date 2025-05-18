import { alpha, Theme } from '@mui/material/styles';
import type { PickersProComponents } from '@mui/x-date-pickers-pro/themeAugmentation';
import type { PickerComponents } from '@mui/x-date-pickers/themeAugmentation';
import { pickersDayClasses } from '@mui/x-date-pickers/PickersDay';
import { pickersCalendarHeaderClasses } from '@mui/x-date-pickers/PickersCalendarHeader';
import { menuItemClasses } from '@mui/material/MenuItem';
import { gray, brand } from '../../../../../shared-theme/themePrimitives';

export const datePickersCustomizations: PickersProComponents<Theme> & PickerComponents<Theme> = {
  MuiPickersPopper: {
    styleOverrides: {
      paper: ({ theme }) => ({
        marginTop: 4,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        [`& .${menuItemClasses.root}`]: {
          borderRadius: 6,
          margin: '0 6px',
        },
        ...theme.applyStyles('dark', {
          background: gray[900],
          boxShadow:
            'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        }),
      }),
    },
  },
  MuiPickersArrowSwitcher: {
    styleOverrides: {
      spacer: { width: 16 },
      button: ({ theme }) => ({
        backgroundColor: 'transparent',
        color: (theme.vars || theme).palette.grey[500],
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[400],
        }),
      }),
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${pickersCalendarHeaderClasses.switchViewButton}`]: {
          padding: 0,
          border: 'none',
        },
      }),
    },
  },
  MuiMonthCalendar: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPickersMonth-monthButton': {
          fontSize: theme.typography.body1.fontSize,
          color: (theme.vars || theme).palette.grey[600],
          padding: theme.spacing(0.5),
          borderRadius: theme.shape.borderRadius,
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          '&.Mui-selected': {
            backgroundColor: gray[700],
            fontWeight: theme.typography.fontWeightMedium,
          },
          '&:focus': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            '&.Mui-selected': { backgroundColor: gray[700] },
          },
          ...theme.applyStyles('dark', {
            color: (theme.vars || theme).palette.grey[300],
            '&:hover': {
              backgroundColor: (theme.vars || theme).palette.action.hover,
            },
            '&.Mui-selected': {
              color: (theme.vars || theme).palette.common.black,
              fontWeight: theme.typography.fontWeightMedium,
              backgroundColor: gray[300],
            },
            '&:focus': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              backgroundColor: 'transparent',
              '&.Mui-selected': { backgroundColor: gray[300] },
            },
          }),
        },
      }),
    },
  },
  MuiYearCalendar: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPickersYear-yearButton': {
          fontSize: theme.typography.body1.fontSize,
          color: (theme.vars || theme).palette.grey[600],
          padding: theme.spacing(0.5),
          borderRadius: theme.shape.borderRadius,
          height: 'fit-content',
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          '&.Mui-selected': {
            backgroundColor: gray[700],
            fontWeight: theme.typography.fontWeightMedium,
          },
          '&:focus': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            '&.Mui-selected': { backgroundColor: gray[700] },
          },
          ...theme.applyStyles('dark', {
            color: (theme.vars || theme).palette.grey[300],
            '&:hover': {
              backgroundColor: (theme.vars || theme).palette.action.hover,
            },
            '&.Mui-selected': {
              color: (theme.vars || theme).palette.common.black,
              fontWeight: theme.typography.fontWeightMedium,
              backgroundColor: gray[300],
            },
            '&:focus': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              backgroundColor: 'transparent',
              '&.Mui-selected': { backgroundColor: gray[300] },
            },
          }),
        },
      }),
    },
  },
  MuiDayCalendar: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPickersDay-root': {
          fontSize: theme.typography.body1.fontSize,
          color: (theme.vars || theme).palette.grey[600],
          padding: theme.spacing(0.5),
          borderRadius: theme.shape.borderRadius,
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          [`&.${pickersDayClasses.selected}`]: {
            backgroundColor: gray[700],
            fontWeight: theme.typography.fontWeightMedium,
          },
          '&:focus': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            [`&.${pickersDayClasses.selected}`]: { backgroundColor: gray[700] },
          },
          ...theme.applyStyles('dark', {
            color: (theme.vars || theme).palette.grey[300],
            '&:hover': {
              backgroundColor: (theme.vars || theme).palette.action.hover,
            },
            [`&.${pickersDayClasses.selected}`]: {
              color: (theme.vars || theme).palette.common.black,
              fontWeight: theme.typography.fontWeightMedium,
              backgroundColor: gray[300],
            },
            '&:focus': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              backgroundColor: 'transparent',
              [`&.${pickersDayClasses.selected}`]: { backgroundColor: gray[300] },
            },
          }),
        },
      }),
    },
  },
};