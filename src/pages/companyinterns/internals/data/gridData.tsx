/* eslint-disable react-refresh/only-export-components */
import { Button, keyframes, Typography, useTheme } from '@mui/material';
import { GridCellParams, GridColDef, GridRowsProp } from '@mui/x-data-grid';
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

interface RenderActionsParams extends GridCellParams {
  onStatusChange: (id: number, status: 'accepted' | 'rejected' | 'finalized' | null) => void;
  applicationStatuses: { [key: number]: 'accepted' | 'rejected' | 'finalized' };
}

const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const colorMap = {
  accepted: 'success',
  rejected: 'error',
  finalized: 'info'
};

const StatusButton: React.FC<{
  id: number;
  status: 'accepted' | 'rejected' | 'finalized' | undefined;
  buttonStatus: 'accepted' | 'rejected' | 'finalized';
  onStatusChange: (id: number, status: 'accepted' | 'rejected' | 'finalized' | null) => void;
  icon: React.ReactElement;
  label: string;
}> = ({ id, status, buttonStatus, onStatusChange, icon, label }) => {
  const isActive = status === buttonStatus;
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isActive) {
      onStatusChange(id, null);
    } else {
      onStatusChange(id, buttonStatus);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      size="small"
      color={isActive ? colorMap[buttonStatus] : 'primary'}
      startIcon={React.cloneElement(icon, {
        style: {
          fontSize: '20px',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scale(1)' : 'scale(0.5)',
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        },
      })}
      sx={{
        '&:hover': {
          transform: isActive ? undefined : 'scale(1.05)',
        },
        '&:active': {
          animation: `${bounce} 0.2s ease-in-out`,
        },
      }}
    >
      <span>{isActive ? `${label}` : label}</span>
    </Button>
  );
};

export const postColumns: GridColDef[] = [
  {
    field: 'postTitle',
    headerName: 'Title',
    flex: 1.5,
    minWidth: 200
  },
  {
    field: 'internName',
    headerName: 'Intern Name',
    flex: 1.5,
    minWidth: 200
  },
  {
    field: 'datePosted',
    headerName: 'Date Posted',
    flex: 1,
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'left'
  },
];

export const postRows: GridRowsProp = [
  {
    id: 1,
    postTitle: 'TechTrend Internship Review',
    internName: 'Sarah Johnson',
    datePosted: '2025-05-01',
    evaluationData: {
      reportTitle: 'Frontend Internship Evaluation',
      title: ['Frontend Development', 'React'],
      introduction: 'My experience at TechTrend was insightful...',
      body: 'I developed React-based web applications...',
    },
  },
  {
    id: 2,
    postTitle: 'Marketing Strategy Analysis',
    internName: 'Michael Chen',
    datePosted: '2025-05-10',
    evaluationData: {
      reportTitle: 'Marketing Internship Evaluation',
      title: ['Digital Marketing', 'Campaign Analysis'],
      introduction: 'Comprehensive analysis of marketing strategies...',
      body: 'Developed and executed social media campaigns...',
    },
  },
  {
    id: 3,
    postTitle: 'Financial Systems Evaluation',
    internName: 'Emma Williams',
    datePosted: '2025-05-05',
    evaluationData: {
      reportTitle: 'Financial Analyst Evaluation',
      title: ['Financial Modeling', 'Data Analysis'],
      introduction: 'In-depth evaluation of financial systems...',
      body: 'Created predictive financial models and reports...',
    },
  },
  {
    id: 4,
    postTitle: 'Clinical Research Review',
    internName: 'Daniel Kim',
    datePosted: '2025-05-12',
    evaluationData: {
      reportTitle: 'Medical Research Evaluation',
      title: ['Clinical Trials', 'Data Collection'],
      introduction: 'Analysis of clinical research methods...',
      body: 'Participated in patient data collection and analysis...',
    },
  },
];

export const draftColumns: GridColDef[] = [
  {
    field: 'draftTitle',
    headerName: 'Title',
    flex: 1.5,
    minWidth: 200
  },
  {
    field: 'internName',
    headerName: 'Intern Name',
    flex: 1.5,
    minWidth: 200
  },
  {
    field: 'lastEdit',
    headerName: 'Last Edit',
    flex: 1,
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'left'
  },
];

export const draftRows: GridRowsProp = [
  {
    id: 1,
    draftTitle: 'Exhilirating Experience!',
    internName: 'Sarah Johnson',
    status: 'Finalized',
    lastEdit: '3 days ago',
    evaluationData: {
      reportTitle: 'Frontend Internship Review',
      title: ['Frontend Development', 'React'],
      introduction: 'This evaluation covers my experience at TechTrend...',
      body: 'During my internship, I worked on several React projects...',
      isFinalized: true,
    },
  },
  {
    id: 2,
    draftTitle: 'The most Fruitful 2 Months of my Life',
    internName: 'Michael Chen',
    status: 'Unfinalized',
    lastEdit: '25 minutes ago',
    evaluationData: {
      reportTitle: 'Marketing Internship Evaluation',
      title: ['Digital Marketing', 'Campaign Strategy'],
      introduction: 'Comprehensive evaluation of marketing operations...',
      body: 'Developed and analyzed social media campaigns...',
      isFinalized: false,
    },
  },
  {
    id: 3,
    draftTitle: 'Had Higher Expectations',
    internName: 'Emma Williams',
    status: 'Unfinalized',
    lastEdit: '1 week ago',
    evaluationData: {
      reportTitle: 'Financial Analyst Experience',
      title: ['Financial Analysis'],
      introduction: 'My time at WealthBridge involved analyzing...',
      body: 'I contributed to financial models and reports...',
      isFinalized: false,
    },
  },
  {
    id: 4,
    draftTitle: 'Not Much to Learn...',
    internName: 'Daniel Kim',
    status: 'Finalized',
    lastEdit: '13 hours ago',
    evaluationData: {
      reportTitle: 'Clinical Research Evaluation',
      title: ['Medical Data Analysis'],
      introduction: 'Evaluation of clinical research methods...',
      body: 'Analyzed patient data and research protocols...',
      isFinalized: true,
    },
  },
];

const StatusButtons: React.FC<{
  id: number;
  status: 'accepted' | 'rejected' | 'finalized' | undefined;
  onStatusChange: (id: number, status: 'accepted' | 'rejected' | 'finalized' | null) => void;
}> = ({ id, status, onStatusChange }) => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <StatusButton
        id={id}
        status={status}
        buttonStatus="accepted"
        onStatusChange={onStatusChange}
        icon={<CheckCircleIcon />}
        label="Accept"
      />
      <StatusButton
        id={id}
        status={status}
        buttonStatus="rejected"
        onStatusChange={onStatusChange}
        icon={<CancelIcon />}
        label="Reject"
      />
      <StatusButton
        id={id}
        status={status}
        buttonStatus="finalized"
        onStatusChange={onStatusChange}
        icon={<DoneIcon />}
        label="Finalize"
      />
    </div>
  );
};

const renderActions = (params: RenderActionsParams) => {
  const status = params.applicationStatuses[params.row.id];
  return <StatusButtons id={params.row.id} status={status} onStatusChange={params.onStatusChange} />;
};

export const appColumns: GridColDef[] = [
  {
    field: 'jobTitle',
    headerName: 'Job Title',
    flex: 1.5,
    minWidth: 200
  },
  {
    field: 'name',
    headerName: 'Applicant Name',
    flex: 1,
    minWidth: 150
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    minWidth: 150,
    renderCell: renderActions,
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

export const rows: GridRowsProp = [
  {
    id: 1,
    jobTitle: 'Software Engineer',
    industry: 'Technology',
    duration: 8,
    paid: true,
    expectedSalary: 25000,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Develop and maintain web applications using modern JavaScript frameworks.',
    applicantNumber: 45,
    applicants: Array.from({ length: 45 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['JavaScript', 'React', 'Node.js', ...(i % 3 === 0 ? ['TypeScript'] : []), ...(i % 5 === 0 ? ['MongoDB'] : [])]
    }))
  },

];