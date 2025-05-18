import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const courses = [
  'CSEN601',
  'CSEN602',
  'CSEN603',
  'CSEN604',
  'CSEN501',
  'DMET501',
  'MATH101',
  'MATH504',
];

interface DropdownMenuProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function DropdownMenu({ value, onChange }: DropdownMenuProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value: selected },
    } = event;
    onChange(typeof selected === 'string' ? selected.split(',') : selected);
  };

  return (
    <FormControl sx={{ m: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <InputLabel id="demo-multiple-checkbox-label">Select courses that helped you during your internship</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Courses" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'divider',
            },
          },
        }}
      >
        {courses.map((course) => (
          <MenuItem key={course} value={course}>
            <Checkbox checked={value.includes(course)} />
            <ListItemText primary={course} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}