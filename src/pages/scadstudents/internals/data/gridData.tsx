import * as React from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Button, Box, useTheme, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: number;
  studentName: string;
  membershipType: 'Pro' | 'Regular';
  internshipStatus: 'Pending' | 'Accepted' | 'Finalized' | 'Rejected';
  email: string;
  major: string;
  skills: string[];
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return '#FFA726'; // Orange
    case 'Accepted':
      return '#66BB6A'; // Green
    case 'Finalized':
      return '#1976D2'; // Blue
    case 'Rejected':
      return '#F44336'; // Red
    default:
      return 'inherit';
  }
};

export const columns: GridColDef[] = [
  {
    field: 'studentName',
    headerName: 'Student Name',
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: 'membershipType',
    headerName: 'Pro/Regular',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'internshipStatus',
    headerName: 'Internship Status',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => {
      const status = params.value as string;
      return (
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          pl: 2
        }}>
          <Typography sx={{ 
            color: getStatusColor(status),
            fontWeight: 600
          }}>
            {status}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: 'viewProfile',
    headerName: '',
    sortable: false,
    width: 130,
    renderCell: (params) => (
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Button
          variant="contained"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            params.row.onViewProfile?.(params.row);
          }}
          sx={{ 
            color: 'common.white', 
            backgroundColor: 'primary.main',
            minWidth: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          View Profile
        </Button>
      </Box>
    ),
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    studentName: 'Ahmed Mostafa',
    membershipType: 'Pro',
    internshipStatus: 'Accepted',
    email: 'ahmed.mostafa@university.edu',
    major: 'Computer Science',
    skills: ['Python', 'JavaScript', 'React'],
  },
  {
    id: 2,
    studentName: 'Fatima Ali',
    membershipType: 'Regular',
    internshipStatus: 'Pending',
    email: 'fatima.ali@university.edu',
    major: 'Data Science',
    skills: ['Python', 'SQL', 'Tableau'],
  },
  {
    id: 3,
    studentName: 'Mohamed Hassan',
    membershipType: 'Pro',
    internshipStatus: 'Finalized',
    email: 'mohamed.hassan@university.edu',
    major: 'Electrical Engineering',
    skills: ['MATLAB', 'C++', 'Embedded Systems'],
  },
  {
    id: 4,
    studentName: 'Sara Khaled',
    membershipType: 'Regular',
    internshipStatus: 'Rejected',
    email: 'sara.khaled@university.edu',
    major: 'Marketing',
    skills: ['SEO', 'Content Creation', 'Social Media'],
  },
  {
    id: 5,
    studentName: 'Omar Youssef',
    membershipType: 'Pro',
    internshipStatus: 'Accepted',
    email: 'omar.youssef@university.edu',
    major: 'Mechanical Engineering',
    skills: ['AutoCAD', 'SolidWorks', 'Project Management'],
  },
  {
    id: 6,
    studentName: 'Nourhan Mahmoud',
    membershipType: 'Regular',
    internshipStatus: 'Pending',
    email: 'nourhan.mahmoud@university.edu',
    major: 'Biomedical Engineering',
    skills: ['MATLAB', 'Medical Imaging', 'Lab Techniques'],
  },
  {
    id: 7,
    studentName: 'Youssef Amr',
    membershipType: 'Pro',
    internshipStatus: 'Finalized',
    email: 'youssef.amr@university.edu',
    major: 'Finance',
    skills: ['Financial Modeling', 'Excel', 'Data Analysis'],
  },
  {
    id: 8,
    studentName: 'Aya Ibrahim',
    membershipType: 'Regular',
    internshipStatus: 'Accepted',
    email: 'aya.ibrahim@university.edu',
    major: 'Graphic Design',
    skills: ['Adobe Photoshop', 'Illustrator', 'UI/UX'],
  },
  {
    id: 9,
    studentName: 'Khaled Salem',
    membershipType: 'Pro',
    internshipStatus: 'Rejected',
    email: 'khaled.salem@university.edu',
    major: 'Civil Engineering',
    skills: ['AutoCAD', 'Structural Analysis', 'Project Management'],
  },
  {
    id: 10,
    studentName: 'Laila Tarek',
    membershipType: 'Regular',
    internshipStatus: 'Pending',
    email: 'laila.tarek@university.edu',
    major: 'Environmental Science',
    skills: ['GIS', 'Sustainability', 'Data Analysis'],
  },
];