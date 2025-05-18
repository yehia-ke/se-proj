import * as React from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

type Industry = 'Technology';

interface Job {
  id: number;
  companyName: string;
  industry: Industry;
  feedback: string;
}

export const columns: GridColDef[] = [
  { 
    field: 'companyName', 
    headerName: 'Company Name', 
    flex: 1.5, 
    minWidth: 200 
  },
  { 
    field: 'industry', 
    headerName: 'Industry', 
    flex: 1, 
    minWidth: 150 
  },
  { 
    field: 'feedback', 
    headerName: 'Applicant Feedback', 
    flex: 2, 
    minWidth: 250,
    renderCell: (params) => (
      <Typography 
        sx={{ 
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          height: '100%'
        }}
      >
        {params.value}
      </Typography>
    )
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    companyName: 'Nexlify Solutions',
    industry: 'Technology',
    feedback: 'Great mentorship for backend projects; hands-on API development.'
  },
  {
    id: 2,
    companyName: 'TechTrend Innovations',
    industry: 'Technology',
    feedback: 'Collaborative environment; interns contribute to real products.'
  },
  {
    id: 3,
    companyName: 'SkyNet Analytics',
    industry: 'Technology',
    feedback: 'Supportive team; excellent for Python and ML skills.'
  },
  {
    id: 4,
    companyName: 'DataWave Technologies',
    industry: 'Technology',
    feedback: 'Real-world data projects; strong focus on Python.'
  },
  {
    id: 5,
    companyName: 'CloudCore Systems',
    industry: 'Technology',
    feedback: 'Ideal for Linux proficiency; hands-on cloud experience.'
  },
  {
    id: 6,
    companyName: 'NextGen Software',
    industry: 'Technology',
    feedback: 'Challenging projects; great for Java expertise.'
  },
  {
    id: 7,
    companyName: 'TechPulse Innovations',
    industry: 'Technology',
    feedback: 'Perfect for Linux server management skills.'
  },
  {
    id: 8,
    companyName: 'InnovateSoft Co.',
    industry: 'Technology',
    feedback: 'Balanced frontend and backend work; MongoDB expertise valued.'
  },
  {
    id: 9,
    companyName: 'DataSync Technologies',
    industry: 'Technology',
    feedback: 'Strong focus on Linux and security practices.'
  },
  {
    id: 10,
    companyName: 'TechNova Systems',
    industry: 'Technology',
    feedback: 'Cutting-edge AI projects; ideal for Python developers.'
  },
];