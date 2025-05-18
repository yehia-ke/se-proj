import * as React from 'react';
import { GridCellParams, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';

type CompanySize = 'Small' | 'Medium' | 'Large' | 'Corporate';
type Industry = 'Technology' | 'Finance' | 'Healthcare' | 'Education' | 'Other';

interface Job {
  id: number;
  jobTitle: string;
  companyName: string;
  companySize: CompanySize;
  industry: Industry;
  duration: number;
  date: string;
}

interface AppliedJob {
  id: number;
  jobTitle: string;
  companyName: string;
  companySize: CompanySize;
  industry: Industry;
  duration: number;
  status: string;
  paid: boolean;
  expectedSalary?: number;
  skillsRequired: string[];
  jobDescription: string;
}

interface Draft {
  id: number;
  draftTitle: string;
  draftType: 'Evaluation' | 'Report';
  companyName: string;
  status: 'Finalized' | 'Unfinalized' | '-';
  lastEdit: string;
  evaluationData?: {
    reportTitle: string;
    title: string[];
    introduction: string;
    body: string;
    isFinalized: boolean;
  };
  reportData?: {
    reportTitle: string;
    content: string;
  };
}

interface Post {
  id: number;
  postTitle: string;
  postType: 'Evaluation' | 'Report';
  companyName: string;
  status: 'Pending' | 'Flagged' | 'Accepted' | 'Rejected';
  datePosted: string;
  evaluationData?: {
    reportTitle: string;
    title: string[];
    introduction: string;
    body: string;
  };
  reportData?: {
    reportTitle: string;
    content: string;
  };
}

export const getExtendedColumns = (handleAppeal: (id: number) => void): GridColDef[] => [
  { 
    field: 'jobTitle', 
    headerName: 'Job Title', 
    flex: 1.5, 
    minWidth: 200 
  },
  { 
    field: 'companyName', 
    headerName: 'Company Name', 
    flex: 1.5, 
    minWidth: 200 
  },
  { 
    field: 'companySize', 
    headerName: 'Company Size', 
    flex: 1, 
    minWidth: 150 
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
    field: 'status', 
    headerName: 'Status', 
    flex: 1, 
    minWidth: 150,
    type: 'string',
    align: 'center',
    headerAlign: 'left',
    renderCell: (params) => (
      <Typography
        sx={{ 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center', 
          height: '100%' 
        }}
        style={{
          color: 
            params.value === 'Pending' ? '#FFC107' :
            params.value === 'Finalized' ? '#19A7FF' :
            params.value === 'Accepted' ? '#4CAF50' :
            params.value === 'Rejected' ? '#F44336' : 'inherit'
        }}
      >
        {params.value}
      </Typography>
    ) 
  },
  {
    field: 'appeal',
    headerName: 'Appeal',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => renderAppealButton(params, handleAppeal),
    sortable: false,
    filterable: false,
  },
];

const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

function renderActions(params: any) {
  const isApplied = params.appliedJobs.includes(params.row.id);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isApplied) {
      params.onApply(params.row.id);
    }
  };

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Button
        onClick={handleClick}
        variant="contained"
        size="small"
        className={`apply-button apply-button-row-${params.row.id}`}
        startIcon={
          isApplied && (
            <CheckCircleIcon
              style={{
                fontSize: '20px',
                opacity: isApplied ? 1 : 0,
                transform: isApplied ? 'scale(1)' : 'scale(0.5)',
                transition: 'opacity 0.3s ease-in-out 0.1s, transform 0.3s ease-in-out 0.1s',
              }}
            />
          )
        }
        style={{
          padding: isApplied ? '6px 12px' : '6px 16px',
          justifyContent: isApplied ? 'flex-start' : 'center',
          transition: 'background-color 0.3s ease-in-out, padding 0.3s ease-in-out',
          color: isApplied ? theme.palette.success.main : theme,
        }}
        sx={{
          '&:hover': {
            transform: isApplied ? undefined : 'scale(1.05)',
          },
          '&:active': {
            animation: `${bounce} 0.2s ease-in-out`,
          },
        }}
      >
        <span>{isApplied ? 'Applied' : 'Apply'}</span>
      </Button>
    </div>
  );
}

function renderAppealButton(params: GridCellParams, handleAppeal: (id: number) => void) {
  return (
    <Button
      onClick={() => handleAppeal(params.row.id)}
      variant="contained"
      size="small"
      disabled={params.row.status !== 'Rejected'}
      sx={{
        '&:hover': {
          transform: params.row.status === 'Rejected' ? 'scale(1.05)' : undefined,
        },
        '&:active': {
          animation: params.row.status === 'Rejected' ? `${bounce} 0.2s ease-in-out` : undefined,
        },
      }}
    >
      Appeal
    </Button>
  );
}

export const columns: GridColDef[] = [
  { 
    field: 'jobTitle', 
    headerName: 'Job Title', 
    flex: 1.5, 
    minWidth: 200 
  },
  { 
    field: 'companyName', 
    headerName: 'Company Name', 
    flex: 1.5, 
    minWidth: 200 
  },
  { 
    field: 'companySize', 
    headerName: 'Company Size', 
    flex: 1, 
    minWidth: 150 
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
    field: 'date', 
    headerName: 'Date', 
    flex: 1, 
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'left'
  },
  { 
    field: 'actions', 
    headerName: 'Actions', 
    flex: 1, 
    minWidth: 150,
    renderCell: renderActions,
    sortable: false,
    filterable: false
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
    field: 'draftType', 
    headerName: 'Type', 
    flex: 1, 
    minWidth: 150 
  },
  { 
    field: 'companyName', 
    headerName: 'Company Name', 
    flex: 1.5, 
    minWidth: 200 
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 1, 
    minWidth: 150,
    renderCell: (params) => (
      <Typography
        sx={{ 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center', 
          height: '100%' 
        }}
        style={{
          color: 
            params.value === 'Finalized' ? '#19A7FF' :
            params.value === 'Unfinalized' ? '#FFC107' :
            params.value === '-' ? '#757575' : 'inherit'
        }}
      >
        {params.value}
      </Typography>
    )
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

export const postColumns: GridColDef[] = [
  { 
    field: 'postTitle', 
    headerName: 'Title', 
    flex: 1.5, 
    minWidth: 200 
  },
  { 
    field: 'postType', 
    headerName: 'Type', 
    flex: 1, 
    minWidth: 150 
  },
  { 
    field: 'companyName', 
    headerName: 'Company Name', 
    flex: 1.5, 
    minWidth: 200 
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 1, 
    minWidth: 150,
    renderCell: (params) => (
      <Typography
        sx={{ 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center', 
          height: '100%' 
        }}
        style={{
          color: 
            params.value === 'Pending' ? '#FFC107' :
            params.value === 'Flagged' ? '#FF9800' :
            params.value === 'Accepted' ? '#4CAF50' :
            params.value === 'Rejected' ? '#F44336' : 'inherit'
        }}
      >
        {params.value}
      </Typography>
    )
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

export const rows: GridRowsProp = [
  {
    id: 1,
    jobTitle: 'Frontend Developer Intern',
    companyName: 'TechTrend Innovations',
    companySize: 'Medium',
    industry: 'Technology',
    duration: 12,
    date: '2025-04-01',
  },
  {
    id: 2,
    jobTitle: 'Marketing Intern',
    companyName: 'GrowEasy Solutions',
    companySize: 'Small',
    industry: 'Other',
    duration: 8,
    date: '2025-04-15',
  },
  {
    id: 3,
    jobTitle: 'Financial Analyst Intern',
    companyName: 'WealthBridge Corp',
    companySize: 'Large',
    industry: 'Finance',
    duration: 10,
    date: '2025-05-01',
  },
  {
    id: 4,
    jobTitle: 'Clinical Research Intern',
    companyName: 'MedCare Systems',
    companySize: 'Corporate',
    industry: 'Healthcare',
    duration: 16,
    date: '2025-05-15',
  },
];

export const draftRows: GridRowsProp = [
  {
    id: 1,
    draftTitle: 'Exhilirating Experience!',
    draftType: 'Evaluation',
    companyName: 'TechTrend Innovations',
    status: '-',
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
    draftType: 'Report',
    companyName: 'GrowEasy Solutions',
    status: 'Unfinalized',
    lastEdit: '25 minutes ago',
    reportData: {
      reportTitle: 'Marketing Internship Report',
      content: 'This report details my marketing tasks at GrowEasy...',
    },
  },
  {
    id: 3,
    draftTitle: 'Had Higher Expectations',
    draftType: 'Evaluation',
    companyName: 'WealthBridge Corp',
    status: '-',
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
    draftType: 'Report',
    companyName: 'MedCare Systems',
    status: 'Finalized',
    lastEdit: '13 hours ago',
    reportData: {
      reportTitle: 'Clinical Research Summary',
      content: 'This report summarizes my research activities at MedCare...',
    },
  },
];

export const postRows: GridRowsProp = [
  {
    id: 1,
    postTitle: 'TechTrend Internship Review',
    postType: 'Evaluation',
    companyName: 'TechTrend Innovations',
    status: 'Accepted',
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
    postTitle: 'Marketing Internship Summary',
    postType: 'Report',
    companyName: 'GrowEasy Solutions',
    status: 'Pending',
    datePosted: '2025-05-10',
    reportData: {
      reportTitle: 'Marketing Internship Report',
      content: 'This report covers my marketing tasks at GrowEasy...',
    },
  },
  {
    id: 3,
    postTitle: 'WealthBridge Experience',
    postType: 'Evaluation',
    companyName: 'WealthBridge Corp',
    status: 'Flagged',
    datePosted: '2025-05-05',
    evaluationData: {
      reportTitle: 'Financial Analyst Evaluation',
      title: ['Financial Analysis'],
      introduction: 'My internship at WealthBridge was challenging...',
      body: 'I worked on financial models and reports...',
    },
  },
  {
    id: 4,
    postTitle: 'MedCare Research Report',
    postType: 'Report',
    companyName: 'MedCare Systems',
    status: 'Rejected',
    datePosted: '2025-05-12',
    reportData: {
      reportTitle: 'Clinical Research Summary',
      content: 'This report summarizes my research at MedCare...',
    },
  },
];

export const rowsInProgress: GridRowsProp = [
  {
    id: 5,
    jobTitle: 'Backend Developer Intern',
    companyName: 'CodeZap Technologies',
    companySize: 'Medium',
    industry: 'Technology',
    duration: 10,
    date: '2025-01-15',
  },
  {
    id: 6,
    jobTitle: 'HR Intern',
    companyName: 'PeopleFirst Solutions',
    companySize: 'Small',
    industry: 'Other',
    duration: 8,
    date: '2025-02-01',
  },
  {
    id: 7,
    jobTitle: 'Investment Banking Intern',
    companyName: 'FinanceFlow Group',
    companySize: 'Large',
    industry: 'Finance',
    duration: 12,
    date: '2025-03-10',
  },
];