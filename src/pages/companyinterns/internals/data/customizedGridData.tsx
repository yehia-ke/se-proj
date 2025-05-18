/* eslint-disable react-refresh/only-export-components */
import { Button, keyframes, useTheme } from '@mui/material';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import React from 'react';

export type Industry = 'Technology' | 'Finance' | 'Healthcare' | 'Education' | 'Other';

export interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  skills: string[];
}

export interface Job {
  id: number;
  jobTitle: string;
  industry: Industry;
  duration: number;
  paid: boolean;
  expectedSalary?: number;
  skillsRequired: string[];
  jobDescription: string;
  applicantNumber: number;
  applicants: Applicant[];
}


export const internColumns: GridColDef[] = [
  {
    field: 'jobTitle',
    headerName: 'Job Title',
    flex: 1.5,
    minWidth: 200
  },
  {
    field: 'name',
    headerName: 'Intern Name',
    flex: 1,
    minWidth: 150
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    minWidth: 150,
    sortable: false,
    filterable: false,
  },
];

export const columns: GridColDef[] = [
  {
    field: 'jobTitle',
    headerName: 'Job Title',
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
    field: 'duration',
    headerName: 'Duration (Weeks)',
    flex: 1,
    minWidth: 150,
    type: 'number',
    align: 'left',
    headerAlign: 'left'
  },
  {
    field: 'applicantNumber',
    headerName: 'No. of Applicants',
    flex: 1,
    minWidth: 150,
    type: 'number',
    align: 'left',
    headerAlign: 'left'
  },
];