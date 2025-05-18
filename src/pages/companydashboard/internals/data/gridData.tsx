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
  {
    id: 2,
    jobTitle: 'Data Analyst',
    industry: 'Healthcare',
    duration: 10,
    paid: true,
    expectedSalary: 20000,
    skillsRequired: ['Python', 'SQL', 'Tableau'],
    jobDescription: 'Analyze healthcare data to provide actionable insights.',
    applicantNumber: 32,
    applicants: Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `data.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Python', 'SQL', 'Tableau', ...(i % 4 === 0 ? ['R'] : []), ...(i % 6 === 0 ? ['PowerBI'] : [])]
    }))
  },
  {
    id: 3,
    jobTitle: 'Academic Coordinator',
    industry: 'Education',
    duration: 6,
    paid: false,
    skillsRequired: ['Curriculum Design', 'Project Management'],
    jobDescription: 'Coordinate academic programs and support faculty.',
    applicantNumber: 18,
    applicants: Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `edu.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Curriculum Design', 'Project Management', ...(i % 3 === 0 ? ['Teaching'] : []), ...(i % 5 === 0 ? ['Educational Technology'] : [])]
    }))
  },
  {
    id: 4,
    jobTitle: 'Financial Advisor',
    industry: 'Finance',
    duration: 12,
    paid: true,
    expectedSalary: 30000,
    skillsRequired: ['Financial Planning', 'Investment Analysis'],
    jobDescription: 'Provide financial planning and investment advice to clients.',
    applicantNumber: 28,
    applicants: Array.from({ length: 28 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `finance.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Financial Planning', 'Investment Analysis', ...(i % 4 === 0 ? ['Wealth Management'] : []), ...(i % 7 === 0 ? ['Tax Planning'] : [])]
    }))
  },
  {
    id: 5,
    jobTitle: 'Environmental Consultant',
    industry: 'Other',
    duration: 9,
    paid: true,
    expectedSalary: 22000,
    skillsRequired: ['Environmental Science', 'Policy Analysis'],
    jobDescription: 'Advise on environmental regulations and sustainability practices.',
    applicantNumber: 22,
    applicants: Array.from({ length: 22 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `env.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Environmental Science', 'Policy Analysis', ...(i % 3 === 0 ? ['Sustainability'] : []), ...(i % 5 === 0 ? ['GIS'] : [])]
    }))
  },
  {
    id: 6,
    jobTitle: 'Systems Administrator',
    industry: 'Healthcare',
    duration: 7,
    paid: true,
    expectedSalary: 21000,
    skillsRequired: ['Linux', 'Network Security'],
    jobDescription: 'Manage and maintain IT infrastructure for healthcare systems.',
    applicantNumber: 27,
    applicants: Array.from({ length: 27 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `sysadmin.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Linux', 'Network Security', ...(i % 4 === 0 ? ['Windows Server'] : []), ...(i % 6 === 0 ? ['Cloud Computing'] : [])]
    }))
  },
  {
    id: 7,
    jobTitle: 'Investment Analyst',
    industry: 'Finance',
    duration: 11,
    paid: true,
    expectedSalary: 28000,
    skillsRequired: ['Financial Modeling', 'Data Analysis'],
    jobDescription: 'Analyze investment opportunities and market trends.',
    applicantNumber: 35,
    applicants: Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `invest.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Financial Modeling', 'Data Analysis', ...(i % 5 === 0 ? ['Valuation'] : []), ...(i % 7 === 0 ? ['Portfolio Management'] : [])]
    }))
  },
  {
    id: 8,
    jobTitle: 'Product Manager',
    industry: 'Technology',
    duration: 5,
    paid: true,
    expectedSalary: 35000,
    skillsRequired: ['Product Lifecycle Management', 'Agile Methodologies'],
    jobDescription: 'Oversee product development from ideation to launch.',
    applicantNumber: 39,
    applicants: Array.from({ length: 39 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `pm.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Product Lifecycle Management', 'Agile Methodologies', ...(i % 4 === 0 ? ['Scrum'] : []), ...(i % 6 === 0 ? ['UX Design'] : [])]
    }))
  },
  {
    id: 9,
    jobTitle: 'Curriculum Developer',
    industry: 'Education',
    duration: 10,
    paid: false,
    skillsRequired: ['Instructional Design', 'Educational Technology'],
    jobDescription: 'Design and develop educational curricula and materials.',
    applicantNumber: 15,
    applicants: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `curriculum.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Instructional Design', 'Educational Technology', ...(i % 3 === 0 ? ['E-Learning'] : []), ...(i % 5 === 0 ? ['Assessment Design'] : [])]
    }))
  },
  {
    id: 10,
    jobTitle: 'Sustainability Analyst',
    industry: 'Other',
    duration: 4,
    paid: true,
    expectedSalary: 19000,
    skillsRequired: ['Sustainability Reporting', 'Data Analysis'],
    jobDescription: 'Analyze and report on sustainability initiatives.',
    applicantNumber: 24,
    applicants: Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `sustainability.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Sustainability Reporting', 'Data Analysis', ...(i % 4 === 0 ? ['Carbon Accounting'] : []), ...(i % 6 === 0 ? ['ESG'] : [])]
    }))
  },
  {
    id: 11,
    jobTitle: 'Machine Learning Engineer',
    industry: 'Technology',
    duration: 9,
    paid: true,
    expectedSalary: 32000,
    skillsRequired: ['Python', 'TensorFlow', 'Machine Learning'],
    jobDescription: 'Design and implement machine learning models for predictive analytics.',
    applicantNumber: 41,
    applicants: Array.from({ length: 41 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `ml.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Python', 'TensorFlow', 'Machine Learning', ...(i % 5 === 0 ? ['PyTorch'] : []), ...(i % 7 === 0 ? ['Deep Learning'] : [])]
    }))
  },
  {
    id: 12,
    jobTitle: 'Clinical Researcher',
    industry: 'Healthcare',
    duration: 12,
    paid: true,
    expectedSalary: 26000,
    skillsRequired: ['Clinical Trials', 'Data Analysis'],
    jobDescription: 'Conduct clinical research to support medical advancements.',
    applicantNumber: 29,
    applicants: Array.from({ length: 29 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `clinical.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Clinical Trials', 'Data Analysis', ...(i % 4 === 0 ? ['Biostatistics'] : []), ...(i % 6 === 0 ? ['Regulatory Affairs'] : [])]
    }))
  },
  {
    id: 13,
    jobTitle: 'Financial Planner',
    industry: 'Finance',
    duration: 6,
    paid: true,
    expectedSalary: 24000,
    skillsRequired: ['Financial Planning', 'Client Relations'],
    jobDescription: 'Develop personalized financial plans for clients.',
    applicantNumber: 31,
    applicants: Array.from({ length: 31 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `fp.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Financial Planning', 'Client Relations', ...(i % 5 === 0 ? ['Retirement Planning'] : []), ...(i % 7 === 0 ? ['Estate Planning'] : [])]
    }))
  },
  {
    id: 14,
    jobTitle: 'Education Consultant',
    industry: 'Education',
    duration: 8,
    paid: false,
    skillsRequired: ['Educational Consulting', 'Program Development'],
    jobDescription: 'Advise schools and institutions on educational strategies.',
    applicantNumber: 17,
    applicants: Array.from({ length: 17 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `edconsult.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Educational Consulting', 'Program Development', ...(i % 3 === 0 ? ['K-12 Education'] : []), ...(i % 5 === 0 ? ['Higher Education'] : [])]
    }))
  },
  {
    id: 15,
    jobTitle: 'Renewable Energy Engineer',
    industry: 'Other',
    duration: 11,
    paid: true,
    expectedSalary: 27000,
    skillsRequired: ['Renewable Energy Systems', 'Engineering Design'],
    jobDescription: 'Design and implement renewable energy solutions.',
    applicantNumber: 26,
    applicants: Array.from({ length: 26 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `energy.applicant${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: ['Renewable Energy Systems', 'Engineering Design', ...(i % 4 === 0 ? ['Solar Energy'] : []), ...(i % 6 === 0 ? ['Wind Energy'] : [])]
    }))
  }
];