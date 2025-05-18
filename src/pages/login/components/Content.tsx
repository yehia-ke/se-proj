import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { SitemarkIcon } from './CustomIcons';

const items = [
  {
    icon: <SearchIcon sx={{ color: 'text.secondary' }} />,
    title: 'Internships made easy',
    description:
      'With our simple and inuitive design you can easily look for and apply for your curated internships.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Attend Workshops',
    description:
      'Attend workshops and apply to events that will help you grow and learn new skills.',
  },
  {
    icon: <ContactPageIcon sx={{ color: 'text.secondary' }} />,
    title: 'Reach a wider audience',
    description:
      'Reach a wider audience with our platform, where students and companies can connect.',
  },
  {
    icon: <FilterAltIcon sx={{ color: 'text.secondary' }} />,
    title: 'Easily select candidates',
    description:
      'With an easy filtering system, you can easily select candidates that fit your needs.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SitemarkIcon />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
