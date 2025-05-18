import * as React from 'react';
import { GridCellParams, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import { GridRowParams } from '@mui/x-data-grid';

type CompanySize = 'Small' | 'Medium' | 'Large' | 'Corporate';
type Industry = 'Technology' | 'Finance' | 'Healthcare' | 'Education' | 'Other';

interface Job {
  id: number;
  jobTitle: string;
  companyName: string;
  companySize: CompanySize;
  industry: Industry;
  date: string;
  duration: number; // Duration in weeks
  date: string; // Date in YYYY-MM-DD format
}

interface AppliedJob {
  id: number;
  jobTitle: string;
  companyName: string;
  companySize: CompanySize;
  industry: Industry;
  date: string; // Retained for data consistency
  duration: number; // Duration in weeks
  status: string;
  paid: boolean;
  expectedSalary?: number; // In EGP, only for paid jobs
  skillsRequired: string[];
  jobDescription: string;
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
    headerName: 'Comments ',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => renderAppealButton(params, handleAppeal),
    sortable: false,
    filterable: false,
  },

];

interface RenderActionsParams extends GridCellParams {
  onApply: (id: number) => void;
  appliedJobs: number[];
}

// Define keyframes for a subtle bounce effect
const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

function renderActions(params: RenderActionsParams) {
  const isApplied = params.appliedJobs.includes(params.row.id);
  const theme = useTheme();

  console.log(`Row ${params.row.id}: isApplied=${isApplied}, appliedJobs=`, params.appliedJobs);

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
    field: 'date', 
    headerName: 'Date', 
    flex: 1, 
    minWidth: 150,
    type: 'string',
    align: 'left',
    headerAlign: 'left'
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
    headerAlign: 'left',
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

export const rows: GridRowsProp = [
  {
    id: 1,
    jobTitle: 'Software Engineer',
    companyName: 'Nexlify Solutions',
    companySize: 'Medium',
    industry: 'Technology',
    date: '01/15/2024',
    duration: 8,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Software Engineer at Nexlify Solutions, focusing on Technology.'
  },
  {
    id: 2,
    jobTitle: 'Data Analyst',
    companyName: 'HealthSync Innovations',
    companySize: 'Large',
    industry: 'Healthcare',
    date: '02/01/2024',
    duration: 10,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Data Analyst at HealthSync Innovations, focusing on Healthcare.'
  },
  {
    id: 3,
    jobTitle: 'Academic Coordinator',
    companyName: 'EduCore Academy',
    companySize: 'Small',
    industry: 'Education',
    date: '03/10/2024',
    duration: 6,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Academic Coordinator at EduCore Academy, focusing on Education.'
  },
  {
    id: 4,
    jobTitle: 'Financial Advisor',
    companyName: 'WealthBridge Financial',
    companySize: 'Corporate',
    industry: 'Finance',
    date: '04/05/2024',
    duration: 12,
    paid: true,
    expectedSalary: 4500,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Financial Advisor at WealthBridge Financial, focusing on Finance.'
  },
  {
    id: 5,
    jobTitle: 'Environmental Consultant',
    companyName: 'GreenTech Enterprises',
    companySize: 'Medium',
    industry: 'Other',
    date: '05/20/2024',
    duration: 9,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as an Environmental Consultant at GreenTech Enterprises, focusing on Other.'
  },
  {
    id: 6,
    jobTitle: 'Systems Administrator',
    companyName: 'MedCare Systems',
    companySize: 'Large',
    industry: 'Healthcare',
    date: '06/12/2024',
    duration: 7,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Systems Administrator at MedCare Systems, focusing on Healthcare.'
  },
  {
    id: 7,
    jobTitle: 'Investment Analyst',
    companyName: 'FinWise Advisors',
    companySize: 'Small',
    industry: 'Finance',
    date: '07/08/2024',
    duration: 11,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as an Investment Analyst at FinWise Advisors, focusing on Finance.'
  },
  {
    id: 8,
    jobTitle: 'Product Manager',
    companyName: 'TechTrend Innovations',
    companySize: 'Corporate',
    industry: 'Technology',
    date: '08/25/2024',
    duration: 5,
    paid: true,
    expectedSalary: 4500,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Product Manager at TechTrend Innovations, focusing on Technology.'
  },
  {
    id: 9,
    jobTitle: 'Curriculum Developer',
    companyName: 'LearnSphere Institute',
    companySize: 'Medium',
    industry: 'Education',
    date: '09/15/2024',
    duration: 10,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as a Curriculum Developer at LearnSphere Institute, focusing on Education.'
  },
  {
    id: 10,
    jobTitle: 'Sustainability Analyst',
    companyName: 'EcoSolutions Ltd.',
    companySize: 'Small',
    industry: 'Other',
    date: '10/01/2024',
    duration: 4,
    paid: true,
    expectedSalary: 1500,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as a Sustainability Analyst at EcoSolutions Ltd., focusing on Other.'
  },
  {
    id: 11,
    jobTitle: 'Machine Learning Engineer',
    companyName: 'SkyNet Analytics',
    companySize: 'Medium',
    industry: 'Technology',
    date: '11/10/2024',
    duration: 9,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Machine Learning Engineer at SkyNet Analytics, focusing on Technology.'
  },
  {
    id: 12,
    jobTitle: 'Clinical Researcher',
    companyName: 'VitalCare Clinics',
    companySize: 'Large',
    industry: 'Healthcare',
    date: '12/05/2024',
    duration: 12,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Clinical Researcher at VitalCare Clinics, focusing on Healthcare.'
  },
  {
    id: 13,
    jobTitle: 'Financial Planner',
    companyName: 'GrowEasy Finance',
    companySize: 'Small',
    industry: 'Finance',
    date: '01/20/2025',
    duration: 6,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Financial Planner at GrowEasy Finance, focusing on Finance.'
  },
  {
    id: 14,
    jobTitle: 'Education Consultant',
    companyName: 'EduQuest Learning',
    companySize: 'Medium',
    industry: 'Education',
    date: '02/15/2025',
    duration: 8,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Education Consultant at EduQuest Learning, focusing on Education.'
  },
  {
    id: 15,
    jobTitle: 'Renewable Energy Engineer',
    companyName: 'CleanEnergy Co.',
    companySize: 'Corporate',
    industry: 'Other',
    date: '03/01/2025',
    duration: 11,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as a Renewable Energy Engineer at CleanEnergy Co., focusing on Other.'
  },
  {
    id: 16,
    jobTitle: 'Data Scientist',
    companyName: 'DataWave Technologies',
    companySize: 'Large',
    industry: 'Technology',
    date: '04/10/2025',
    duration: 7,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Data Scientist at DataWave Technologies, focusing on Technology.'
  },
  {
    id: 17,
    jobTitle: 'Healthcare Administrator',
    companyName: 'HealthPoint Solutions',
    companySize: 'Medium',
    industry: 'Healthcare',
    date: '05/05/2025',
    duration: 10,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Healthcare Administrator at HealthPoint Solutions, focusing on Healthcare.'
  },
  {
    id: 18,
    jobTitle: 'Portfolio Manager',
    companyName: 'SmartInvest Group',
    companySize: 'Small',
    industry: 'Finance',
    date: '06/20/2024',
    duration: 5,
    paid: true,
    expectedSalary: 1500,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Portfolio Manager at SmartInvest Group, focusing on Finance.'
  },
  {
    id: 19,
    jobTitle: 'Instructional Designer',
    companyName: 'KnowledgeHub Academy',
    companySize: 'Small',
    industry: 'Education',
    date: '07/15/2024',
    duration: 9,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Instructional Designer at KnowledgeHub Academy, focusing on Education.'
  },
  {
    id: 20,
    jobTitle: 'Biotech Researcher',
    companyName: 'BioTech Innovations',
    companySize: 'Medium',
    industry: 'Other',
    date: '08/01/2024',
    duration: 12,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as a Biotech Researcher at BioTech Innovations, focusing on Other.'
  },
  {
    id: 21,
    jobTitle: 'Cloud Architect',
    companyName: 'CloudCore Systems',
    companySize: 'Corporate',
    industry: 'Technology',
    date: '09/10/2024',
    duration: 6,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Cloud Architect at CloudCore Systems, focusing on Technology.'
  },
  {
    id: 22,
    jobTitle: 'Medical Director',
    companyName: 'CarePlus Medical',
    companySize: 'Large',
    industry: 'Healthcare',
    date: '10/05/2024',
    duration: 8,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Medical Director at CarePlus Medical, focusing on Healthcare.'
  },
  {
    id: 23,
    jobTitle: 'Wealth Manager',
    companyName: 'WealthPath Advisors',
    companySize: 'Medium',
    industry: 'Finance',
    date: '11/20/2024',
    duration: 11,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Wealth Manager at WealthPath Advisors, focusing on Finance.'
  },
  {
    id: 24,
    jobTitle: 'Learning Specialist',
    companyName: 'LearnFast Institute',
    companySize: 'Small',
    industry: 'Education',
    date: '12/15/2024',
    duration: 7,
    paid: true,
    expectedSalary: 1500,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as a Learning Specialist at LearnFast Institute, focusing on Education.'
  },
  {
    id: 25,
    jobTitle: 'Environmental Engineer',
    companyName: 'GreenWave Solutions',
    companySize: 'Medium',
    industry: 'Other',
    date: '01/01/2025',
    duration: 10,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as an Environmental Engineer at GreenWave Solutions, focusing on Other.'
  },
  {
    id: 26,
    jobTitle: 'Software Architect',
    companyName: 'NextGen Software',
    companySize: 'Large',
    industry: 'Technology',
    date: '02/10/2025',
    duration: 5,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Software Architect at NextGen Software, focusing on Technology.'
  },
  {
    id: 27,
    jobTitle: 'Health IT Specialist',
    companyName: 'MediSync Health',
    companySize: 'Corporate',
    industry: 'Healthcare',
    date: '03/05/2025',
    duration: 9,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Health IT Specialist at MediSync Health, focusing on Healthcare.'
  },
  {
    id: 28,
    jobTitle: 'Risk Analyst',
    companyName: 'CapitalGrow Financial',
    companySize: 'Small',
    industry: 'Finance',
    date: '04/20/2025',
    duration: 12,
    paid: true,
    expectedSalary: 1500,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Risk Analyst at CapitalGrow Financial, focusing on Finance.'
  },
  {
    id: 29,
    jobTitle: 'Education Program Manager',
    companyName: 'EduSpark Academy',
    companySize: 'Medium',
    industry: 'Education',
    date: '05/15/2025',
    duration: 6,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Education Program Manager at EduSpark Academy, focusing on Education.'
  },
  {
    id: 30,
    jobTitle: 'Green Technology Specialist',
    companyName: 'EcoTech Ventures',
    companySize: 'Small',
    industry: 'Other',
    date: '06/01/2024',
    duration: 8,
  },
  {
    id: 31,
    jobTitle: 'DevOps Engineer',
    companyName: 'TechPulse Innovations',
    companySize: 'Medium',
    industry: 'Technology',
    date: '07/10/2024',
    duration: 11,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a DevOps Engineer at TechPulse Innovations, focusing on Technology.'
  },
  {
    id: 32,
    jobTitle: 'Patient Care Coordinator',
    companyName: 'HealthTrend Systems',
    companySize: 'Large',
    industry: 'Healthcare',
    date: '08/05/2024',
    duration: 7,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Patient Care Coordinator at HealthTrend Systems, focusing on Healthcare.'
  },
  {
    id: 33,
    jobTitle: 'Corporate Finance Analyst',
    companyName: 'FinancePro Solutions',
    companySize: 'Corporate',
    industry: 'Finance',
    date: '09/20/2024',
    duration: 10,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Corporate Finance Analyst at FinancePro Solutions, focusing on Finance.'
  },
  {
    id: 34,
    jobTitle: 'Online Learning Specialist',
    companyName: 'SkillUp Learning',
    companySize: 'Small',
    industry: 'Education',
    date: '10/15/2024',
    duration: 5,
    paid: true,
    expectedSalary: 1500,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Online Learning Specialist at SkillUp Learning, focusing on Education.'
  },
  {
    id: 35,
    jobTitle: 'Solar Energy Consultant',
    companyName: 'SolarTech Enterprises',
    companySize: 'Medium',
    industry: 'Other',
    date: '11/01/2024',
    duration: 9,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as a Solar Energy Consultant at SolarTech Enterprises, focusing on Other.'
  },
  {
    id: 36,
    jobTitle: 'Full Stack Developer',
    companyName: 'InnovateSoft Co.',
    companySize: 'Large',
    industry: 'Technology',
    date: '12/10/2024',
    duration: 12,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Full Stack Developer at InnovateSoft Co., focusing on Technology.'
  },
  {
    id: 37,
    jobTitle: 'Wellness Program Manager',
    companyName: 'WellnessCare Group',
    companySize: 'Medium',
    industry: 'Healthcare',
    date: '01/05/2025',
    duration: 6,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Wellness Program Manager at WellnessCare Group, focusing on Healthcare.'
  },
  {
    id: 38,
    jobTitle: 'Financial Consultant',
    companyName: 'MoneyWise Financial',
    companySize: 'Small',
    industry: 'Finance',
    date: '02/20/2025',
    duration: 8,
    paid: true,
    expectedSalary: 1500,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Financial Consultant at MoneyWise Financial, focusing on Finance.'
  },
  {
    id: 39,
    jobTitle: 'Education Technology Specialist',
    companyName: 'EduGrow Institute',
    companySize: 'Medium',
    industry: 'Education',
    date: '03/15/2025',
    duration: 11,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Education Technology Specialist at EduGrow Institute, focusing on Education.'
  },
  {
    id: 40,
    jobTitle: 'Clean Technology Analyst',
    companyName: 'CleanTech Solutions',
    companySize: 'Corporate',
    industry: 'Other',
    date: '04/01/2025',
    duration: 7,
    paid: true,
    expectedSalary: 4500,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as a Clean Technology Analyst at CleanTech Solutions, focusing on Other.'
  },
  {
    id: 41,
    jobTitle: 'Cybersecurity Analyst',
    companyName: 'DataSync Technologies',
    companySize: 'Large',
    industry: 'Technology',
    date: '05/10/2025',
    duration: 10,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Cybersecurity Analyst at DataSync Technologies, focusing on Technology.'
  },
  {
    id: 42,
    jobTitle: 'Health Data Analyst',
    companyName: 'HealthCore Innovations',
    companySize: 'Medium',
    industry: 'Healthcare',
    date: '06/05/2024',
    duration: 5,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Health Data Analyst at HealthCore Innovations, focusing on Healthcare.'
  },
  {
    id: 43,
    jobTitle: 'Investment Advisor',
    companyName: 'InvestSmart Advisors',
    companySize: 'Small',
    industry: 'Finance',
    date: '07/20/2024',
    duration: 9,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as an Investment Advisor at InvestSmart Advisors, focusing on Finance.'
  },
  {
    id: 44,
    jobTitle: 'Academic Advisor',
    companyName: 'LearnCore Academy',
    companySize: 'Medium',
    industry: 'Education',
    date: '08/15/2024',
    duration: 12,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Academic Advisor at LearnCore Academy, focusing on Education.'
  },
  {
    id: 45,
    jobTitle: 'Energy Efficiency Specialist',
    companyName: 'GreenEnergy Co.',
    companySize: 'Small',
    industry: 'Other',
    date: '09/01/2024',
    duration: 6,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as an Energy Efficiency Specialist at GreenEnergy Co., focusing on Other.'
  },
  {
    id: 46,
    jobTitle: 'AI Research Scientist',
    companyName: 'TechNova Systems',
    companySize: 'Corporate',
    industry: 'Technology',
    date: '10/10/2024',
    duration: 8,
    paid: true,
    expectedSalary: 4500,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as an AI Research Scientist at TechNova Systems, focusing on Technology.'
  },
  {
    id: 47,
    jobTitle: 'Healthcare Consultant',
    companyName: 'MediCare Solutions',
    companySize: 'Large',
    industry: 'Healthcare',
    date: '11/05/2024',
    duration: 11,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Healthcare Consultant at MediCare Solutions, focusing on Healthcare.'
  },
  {
    id: 48,
    jobTitle: 'Wealth Management Analyst',
    companyName: 'WealthSync Financial',
    companySize: 'Medium',
    industry: 'Finance',
    date: '12/20/2024',
    duration: 7,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Wealth Management Analyst at WealthSync Financial, focusing on Finance.'
  },
  {
    id: 49,
    jobTitle: 'Education Content Developer',
    companyName: 'EduTrend Institute',
    companySize: 'Small',
    industry: 'Education',
    date: '01/15/2025',
    duration: 10,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Education Content Developer at EduTrend Institute, focusing on Education.'
  },
  {
    id: 50,
    jobTitle: 'Bioenergy Specialist',
    companyName: 'BioEnergy Ventures',
    companySize: 'Medium',
    industry: 'Other',
    date: '02/01/2025',
    duration: 5,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as a Bioenergy Specialist at BioEnergy Ventures, focusing on Other.'
  },
  {
    id: 51,
    jobTitle: 'Cloud Solutions Architect',
    companyName: 'CloudTrend Technologies',
    companySize: 'Large',
    industry: 'Technology',
    date: '03/10/2025',
    duration: 9,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Cloud Solutions Architect at CloudTrend Technologies, focusing on Technology.'
  },
  {
    id: 52,
    jobTitle: 'Medical Systems Analyst',
    companyName: 'HealthWave Systems',
    companySize: 'Corporate',
    industry: 'Healthcare',
    date: '04/05/2025',
    duration: 12,
    paid: true,
    expectedSalary: 4500,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Medical Systems Analyst at HealthWave Systems, focusing on Healthcare.'
  },
  {
    id: 53,
    jobTitle: 'Financial Risk Manager',
    companyName: 'FinanceTrend Advisors',
    companySize: 'Small',
    industry: 'Finance',
    date: '05/20/2025',
    duration: 6,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Financial Risk Manager at FinanceTrend Advisors, focusing on Finance.'
  },
  {
    id: 54,
    jobTitle: 'Learning Experience Designer',
    companyName: 'SkillTrend Academy',
    companySize: 'Medium',
    industry: 'Education',
    date: '06/15/2024',
    duration: 8,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as a Learning Experience Designer at SkillTrend Academy, focusing on Education.'
  },
  {
    id: 55,
    jobTitle: 'Sustainable Energy Analyst',
    companyName: 'EcoEnergy Solutions',
    companySize: 'Small',
    industry: 'Other',
    date: '07/01/2024',
    duration: 11,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as a Sustainable Energy Analyst at EcoEnergy Solutions, focusing on Other.'
  },
  {
    id: 56,
    jobTitle: 'Frontend Developer',
    companyName: 'TechWave Innovations',
    companySize: 'Medium',
    industry: 'Technology',
    date: '08/10/2024',
    duration: 7,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Frontend Developer at TechWave Innovations, focusing on Technology.'
  },
  {
    id: 57,
    jobTitle: 'Clinical Operations Manager',
    companyName: 'CareTrend Medical',
    companySize: 'Large',
    industry: 'Healthcare',
    date: '09/05/2024',
    duration: 10,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Clinical Operations Manager at CareTrend Medical, focusing on Healthcare.'
  },
  {
    id: 58,
    jobTitle: 'Corporate Treasurer',
    companyName: 'MoneyTrend Financial',
    companySize: 'Corporate',
    industry: 'Finance',
    date: '10/20/2024',
    duration: 5,
    paid: true,
    expectedSalary: 4500,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Corporate Treasurer at MoneyTrend Financial, focusing on Finance.'
  },
  {
    id: 59,
    jobTitle: 'Education Program Coordinator',
    companyName: 'EduWave Institute',
    companySize: 'Small',
    industry: 'Education',
    date: '11/15/2024',
    duration: 9,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Education Program Coordinator at EduWave Institute, focusing on Education.'
  },
  {
    id: 60,
    jobTitle: 'Green Technology Consultant',
    companyName: 'GreenTrend Ventures',
    companySize: 'Medium',
    industry: 'Other',
    date: '12/01/2024',
    duration: 12,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as a Green Technology Consultant at GreenTrend Ventures, focusing on Other.'
  },
  {
    id: 61,
    jobTitle: 'Big Data Engineer',
    companyName: 'DataTrend Technologies',
    companySize: 'Large',
    industry: 'Technology',
    date: '01/10/2025',
    duration: 6,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Big Data Engineer at DataTrend Technologies, focusing on Technology.'
  },
  {
    id: 62,
    jobTitle: 'Health Informatics Specialist',
    companyName: 'HealthSync Solutions',
    companySize: 'Medium',
    industry: 'Healthcare',
    date: '02/05/2025',
    duration: 8,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Health Informatics Specialist at HealthSync Solutions, focusing on Healthcare.'
  },
  {
    id: 63,
    jobTitle: 'Investment Strategist',
    companyName: 'InvestTrend Group',
    companySize: 'Small',
    industry: 'Finance',
    date: '03/20/2025',
    duration: 11,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as an Investment Strategist at InvestTrend Group, focusing on Finance.'
  },
  {
    id: 64,
    jobTitle: 'Education Technology Consultant',
    companyName: 'LearnTrend Academy',
    companySize: 'Medium',
    industry: 'Education',
    date: '04/15/2025',
    duration: 7,
    paid: true,
    expectedSalary: 2500,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Education Technology Consultant at LearnTrend Academy, focusing on Education.'
  },
  {
    id: 65,
    jobTitle: 'Clean Energy Project Manager',
    companyName: 'CleanEnergy Ventures',
    companySize: 'Corporate',
    industry: 'Other',
    date: '05/01/2025',
    duration: 10,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as a Clean Energy Project Manager at CleanEnergy Ventures, focusing on Other.'
  },
  {
    id: 66,
    jobTitle: 'Network Security Engineer',
    companyName: 'TechSync Systems',
    companySize: 'Large',
    industry: 'Technology',
    date: '06/10/2024',
    duration: 5,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Network Security Engineer at TechSync Systems, focusing on Technology.'
  },
  {
    id: 67,
    jobTitle: 'Healthcare Quality Manager',
    companyName: 'MediTrend Health',
    companySize: 'Medium',
    industry: 'Healthcare',
    date: '07/05/2024',
    duration: 9,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Healthcare Quality Manager at MediTrend Health, focusing on Healthcare.'
  },
  {
    id: 68,
    jobTitle: 'Financial Planning Analyst',
    companyName: 'WealthTrend Advisors',
    companySize: 'Small',
    industry: 'Finance',
    date: '08/20/2024',
    duration: 12,
    paid: true,
    expectedSalary: 1500,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Financial Planning Analyst at WealthTrend Advisors, focusing on Finance.'
  },
  {
    id: 69,
    jobTitle: 'Education Outreach Coordinator',
    companyName: 'EduSync Institute',
    companySize: 'Medium',
    industry: 'Education',
    date: '09/15/2024',
    duration: 6,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Education Outreach Coordinator at EduSync Institute, focusing on Education.'
  },
  {
    id: 70,
    jobTitle: 'Biotechnology Consultant',
    companyName: 'BioTrend Solutions',
    companySize: 'Small',
    industry: 'Other',
    date: '10/01/2024',
    duration: 8,
  },
  {
    id: 71,
    jobTitle: 'Cloud Security Specialist',
    companyName: 'CloudSync Technologies',
    companySize: 'Corporate',
    industry: 'Technology',
    date: '11/10/2024',
    duration: 11,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Cloud Security Specialist at CloudSync Technologies, focusing on Technology.'
  },
  {
    id: 72,
    jobTitle: 'Medical Practice Manager',
    companyName: 'CareSync Medical',
    companySize: 'Large',
    industry: 'Healthcare',
    date: '12/05/2024',
    duration: 7,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Medical Practice Manager at CareSync Medical, focusing on Healthcare.'
  },
  {
    id: 73,
    jobTitle: 'Financial Compliance Officer',
    companyName: 'MoneySync Financial',
    companySize: 'Medium',
    industry: 'Finance',
    date: '01/20/2025',
    duration: 10,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Financial Compliance Officer at MoneySync Financial, focusing on Finance.'
  },
  {
    id: 74,
    jobTitle: 'Learning Management System Administrator',
    companyName: 'SkillSync Academy',
    companySize: 'Small',
    industry: 'Education',
    date: '02/15/2025',
    duration: 5,
    paid: true,
    expectedSalary: 1500,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as a Learning Management System Administrator at SkillSync Academy, focusing on Education.'
  },
  {
    id: 75,
    jobTitle: 'Environmental Policy Analyst',
    companyName: 'EcoSync Ventures',
    companySize: 'Medium',
    industry: 'Other',
    date: '03/01/2025',
    duration: 9,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as an Environmental Policy Analyst at EcoSync Ventures, focusing on Other.'
  },
  {
    id: 76,
    jobTitle: 'Software Development Manager',
    companyName: 'TechCore Innovations',
    companySize: 'Large',
    industry: 'Technology',
    date: '04/10/2025',
    duration: 12,
    paid: true,
    expectedSalary: 3500,
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    jobDescription: 'Internship opportunity as a Software Development Manager at TechCore Innovations, focusing on Technology.'
  },
  {
    id: 77,
    jobTitle: 'Health Systems Analyst',
    companyName: 'HealthCore Systems',
    companySize: 'Corporate',
    industry: 'Healthcare',
    date: '05/05/2025',
    duration: 6,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Medical Knowledge', 'Patient Care', 'Data Analysis'],
    jobDescription: 'Internship opportunity as a Health Systems Analyst at HealthCore Systems, focusing on Healthcare.'
  },
  {
    id: 78,
    jobTitle: 'Private Wealth Advisor',
    companyName: 'InvestCore Advisors',
    companySize: 'Small',
    industry: 'Finance',
    date: '06/20/2024',
    duration: 8,
    paid: true,
    expectedSalary: 1500,
    skillsRequired: ['Financial Modeling', 'Excel', 'Accounting'],
    jobDescription: 'Internship opportunity as a Private Wealth Advisor at InvestCore Advisors, focusing on Finance.'
  },
  {
    id: 79,
    jobTitle: 'Education Assessment Specialist',
    companyName: 'LearnCore Institute',
    companySize: 'Medium',
    industry: 'Education',
    date: '07/15/2024',
    duration: 11,
    paid: false,
    expectedSalary: undefined,
    skillsRequired: ['Curriculum Development', 'Teaching', 'Communication'],
    jobDescription: 'Internship opportunity as an Education Assessment Specialist at LearnCore Institute, focusing on Education.'
  },
  {
    id: 80,
    jobTitle: 'Green Building Consultant',
    companyName: 'GreenCore Solutions',
    companySize: 'Small',
    industry: 'Other',
    date: '08/01/2024',
    duration: 7,
    paid: true,
    expectedSalary: 1500,
    skillsRequired: ['Project Management', 'Research', 'Sustainability'],
    jobDescription: 'Internship opportunity as a Green Building Consultant at GreenCore Solutions, focusing on Other.'
  },
];