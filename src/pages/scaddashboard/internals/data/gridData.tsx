import * as React from 'react';
import Chip from '@mui/material/Chip';
import { GridCellParams, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';

type CompanySize = 'Small' | 'Medium' | 'Large' | 'Corporate';
type Industry = 'Technology' | 'Finance' | 'Healthcare' | 'Education' | 'Other';
type VerificationStatus = 'Pending' | 'Verified' | 'Rejected';

interface Company {
  id: number;
  companyName: string;
  companyEmail: string;
  companySize: CompanySize;
  industry: Industry;
  verificationStatus: VerificationStatus;
}

function renderStatus(status: VerificationStatus) {
  const colors: { [key in VerificationStatus]: 'default' | 'primary' | 'success' | 'error' } = {
    Pending: 'default',
    Verified: 'success',
    Rejected: 'error',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

function renderActions(params: GridCellParams & { onRemove: (id: number, action: 'accept' | 'reject') => void }) {
  const handleAcceptClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click event
    params.onRemove(params.row.id, 'accept');
  };

  const handleRejectClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click event
    params.onRemove(params.row.id, 'reject');
  };

  return (
    <div>
      <IconButton
        onClick={handleAcceptClick}
        color="success"
        size="small"
        aria-label={`Accept ${params.row.companyName}`}
      >
        <CheckIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        onClick={handleRejectClick}
        color="error"
        size="small"
        aria-label={`Reject ${params.row.companyName}`}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
}

export const columns: GridColDef[] = [
  { 
    field: 'companyName', 
    headerName: 'Company Name', 
    flex: 1.5, 
    minWidth: 200 
  },
  { 
    field: 'companyEmail', 
    headerName: 'Company Email', 
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
    field: 'verificationStatus', 
    headerName: 'Verification Status', 
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
            params.value === 'Verified' ? '#4CAF50' :
            params.value === 'Rejected' ? '#F44336' : 'inherit'
        }}
      >
        {params.value}
      </Typography>
    ) 
    },
  
  { 
    field: 'actions', 
    headerName: 'Actions', 
    flex: 1, 
    minWidth: 150,
    renderCell: (params) => renderActions({ 
      ...params, 
      onRemove: params.colDef.onRemove || (() => {})
    }),
    sortable: false,
    filterable: false
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    companyName: 'Nexlify Solutions',
    companyEmail: 'contact@nexlify.com',
    companySize: 'Medium',
    industry: 'Technology',
    verificationStatus: 'Pending',
  },
  {
    id: 2,
    companyName: 'HealthSync Innovations',
    companyEmail: 'info@healthsync.com',
    companySize: 'Large',
    industry: 'Healthcare',
    verificationStatus: 'Verified',
  },
  {
    id: 3,
    companyName: 'EduCore Academy',
    companyEmail: 'support@educore.com',
    companySize: 'Small',
    industry: 'Education',
    verificationStatus: 'Rejected',
  },
  {
    id: 4,
    companyName: 'WealthBridge Financial',
    companyEmail: 'admin@wealthbridge.com',
    companySize: 'Corporate',
    industry: 'Finance',
    verificationStatus: 'Pending',
  },
  {
    id: 5,
    companyName: 'GreenTech Enterprises',
    companyEmail: 'info@greentech.com',
    companySize: 'Medium',
    industry: 'Other',
    verificationStatus: 'Pending',
  },
  {
    id: 6,
    companyName: 'MedCare Systems',
    companyEmail: 'contact@medcare.com',
    companySize: 'Large',
    industry: 'Healthcare',
    verificationStatus: 'Verified',
  },
  {
    id: 7,
    companyName: 'FinWise Advisors',
    companyEmail: 'support@finwise.com',
    companySize: 'Small',
    industry: 'Finance',
    verificationStatus: 'Rejected',
  },
  {
    id: 8,
    companyName: 'TechTrend Innovations',
    companyEmail: 'info@techtrend.com',
    companySize: 'Corporate',
    industry: 'Technology',
    verificationStatus: 'Pending',
  },
  {
    id: 9,
    companyName: 'LearnSphere Institute',
    companyEmail: 'admin@learnsphere.com',
    companySize: 'Medium',
    industry: 'Education',
    verificationStatus: 'Verified',
  },
  {
    id: 10,
    companyName: 'EcoSolutions Ltd.',
    companyEmail: 'contact@ecosolutions.com',
    companySize: 'Small',
    industry: 'Other',
    verificationStatus: 'Pending',
  },
  {
    id: 11,
    companyName: 'SkyNet Analytics',
    companyEmail: 'info@skynet.com',
    companySize: 'Medium',
    industry: 'Technology',
    verificationStatus: 'Verified',
  },
  {
    id: 12,
    companyName: 'VitalCare Clinics',
    companyEmail: 'support@vitalcare.com',
    companySize: 'Large',
    industry: 'Healthcare',
    verificationStatus: 'Pending',
  },
  {
    id: 13,
    companyName: 'GrowEasy Finance',
    companyEmail: 'contact@groweasy.com',
    companySize: 'Small',
    industry: 'Finance',
    verificationStatus: 'Rejected',
  },
  {
    id: 14,
    companyName: 'EduQuest Learning',
    companyEmail: 'admin@eduquest.com',
    companySize: 'Medium',
    industry: 'Education',
    verificationStatus: 'Verified',
  },
  {
    id: 15,
    companyName: 'CleanEnergy Co.',
    companyEmail: 'info@cleanenergy.com',
    companySize: 'Corporate',
    industry: 'Other',
    verificationStatus: 'Pending',
  },
  {
    id: 16,
    companyName: 'DataWave Technologies',
    companyEmail: 'contact@datawave.com',
    companySize: 'Large',
    industry: 'Technology',
    verificationStatus: 'Verified',
  },
  {
    id: 17,
    companyName: 'HealthPoint Solutions',
    companyEmail: 'support@healthpoint.com',
    companySize: 'Medium',
    industry: 'Healthcare',
    verificationStatus: 'Rejected',
  },
  {
    id: 18,
    companyName: 'SmartInvest Group',
    companyEmail: 'info@smartinvest.com',
    companySize: 'Small',
    industry: 'Finance',
    verificationStatus: 'Pending',
  },
  {
    id: 19,
    companyName: 'KnowledgeHub Academy',
    companyEmail: 'admin@knowledgehub.com',
    companySize: 'Small',
    industry: 'Education',
    verificationStatus: 'Verified',
  },
  {
    id: 20,
    companyName: 'BioTech Innovations',
    companyEmail: 'contact@biotech.com',
    companySize: 'Medium',
    industry: 'Other',
    verificationStatus: 'Pending',
  },
  {
    id: 21,
    companyName: 'CloudCore Systems',
    companyEmail: 'info@cloudcore.com',
    companySize: 'Corporate',
    industry: 'Technology',
    verificationStatus: 'Rejected',
  },
  {
    id: 22,
    companyName: 'CarePlus Medical',
    companyEmail: 'support@careplus.com',
    companySize: 'Large',
    industry: 'Healthcare',
    verificationStatus: 'Verified',
  },
  {
    id: 23,
    companyName: 'WealthPath Advisors',
    companyEmail: 'admin@wealthpath.com',
    companySize: 'Medium',
    industry: 'Finance',
    verificationStatus: 'Pending',
  },
  {
    id: 24,
    companyName: 'LearnFast Institute',
    companyEmail: 'contact@learnfast.com',
    companySize: 'Small',
    industry: 'Education',
    verificationStatus: 'Rejected',
  },
  {
    id: 25,
    companyName: 'GreenWave Solutions',
    companyEmail: 'info@greenwave.com',
    companySize: 'Medium',
    industry: 'Other',
    verificationStatus: 'Verified',
  },
  {
    id: 26,
    companyName: 'NextGen Software',
    companyEmail: 'support@nextgen.com',
    companySize: 'Large',
    industry: 'Technology',
    verificationStatus: 'Pending',
  },
  {
    id: 27,
    companyName: 'MediSync Health',
    companyEmail: 'contact@medisync.com',
    companySize: 'Corporate',
    industry: 'Healthcare',
    verificationStatus: 'Verified',
  },
  {
    id: 28,
    companyName: 'CapitalGrow Financial',
    companyEmail: 'admin@capitalgrow.com',
    companySize: 'Small',
    industry: 'Finance',
    verificationStatus: 'Rejected',
  },
  {
    id: 29,
    companyName: 'EduSpark Academy',
    companyEmail: 'info@eduspark.com',
    companySize: 'Medium',
    industry: 'Education',
    verificationStatus: 'Pending',
  },
  {
    id: 30,
    companyName: 'EcoTech Ventures',
    companyEmail: 'support@ecotech.com',
    companySize: 'Small',
    industry: 'Other',
    verificationStatus: 'Verified',
  },
  {
    id: 31,
    companyName: 'TechPulse Innovations',
    companyEmail: 'contact@techpulse.com',
    companySize: 'Medium',
    industry: 'Technology',
    verificationStatus: 'Pending',
  },
  {
    id: 32,
    companyName: 'HealthTrend Systems',
    companyEmail: 'info@healthtrend.com',
    companySize: 'Large',
    industry: 'Healthcare',
    verificationStatus: 'Rejected',
  },
  {
    id: 33,
    companyName: 'FinancePro Solutions',
    companyEmail: 'admin@financepro.com',
    companySize: 'Corporate',
    industry: 'Finance',
    verificationStatus: 'Verified',
  },
  {
    id: 34,
    companyName: 'SkillUp Learning',
    companyEmail: 'support@skillup.com',
    companySize: 'Small',
    industry: 'Education',
    verificationStatus: 'Pending',
  },
  {
    id: 35,
    companyName: 'SolarTech Enterprises',
    companyEmail: 'contact@solartech.com',
    companySize: 'Medium',
    industry: 'Other',
    verificationStatus: 'Rejected',
  },
  {
    id: 36,
    companyName: 'InnovateSoft Co.',
    companyEmail: 'info@innovatesoft.com',
    companySize: 'Large',
    industry: 'Technology',
    verificationStatus: 'Verified',
  },
  {
    id: 37,
    companyName: 'WellnessCare Group',
    companyEmail: 'admin@wellnesscare.com',
    companySize: 'Medium',
    industry: 'Healthcare',
    verificationStatus: 'Pending',
  },
  {
    id: 38,
    companyName: 'MoneyWise Financial',
    companyEmail: 'support@moneywise.com',
    companySize: 'Small',
    industry: 'Finance',
    verificationStatus: 'Rejected',
  },
  {
    id: 39,
    companyName: 'EduGrow Institute',
    companyEmail: 'contact@edugrow.com',
    companySize: 'Medium',
    industry: 'Education',
    verificationStatus: 'Verified',
  },
  {
    id: 40,
    companyName: 'CleanTech Solutions',
    companyEmail: 'info@cleantech.com',
    companySize: 'Corporate',
    industry: 'Other',
    verificationStatus: 'Pending',
  },
  {
    id: 41,
    companyName: 'DataSync Technologies',
    companyEmail: 'support@datasync.com',
    companySize: 'Large',
    industry: 'Technology',
    verificationStatus: 'Verified',
  },
  {
    id: 42,
    companyName: 'HealthCore Innovations',
    companyEmail: 'contact@healthcore.com',
    companySize: 'Medium',
    industry: 'Healthcare',
    verificationStatus: 'Rejected',
  },
  {
    id: 43,
    companyName: 'InvestSmart Advisors',
    companyEmail: 'admin@investsmart.com',
    companySize: 'Small',
    industry: 'Finance',
    verificationStatus: 'Pending',
  },
  {
    id: 44,
    companyName: 'LearnCore Academy',
    companyEmail: 'info@learncore.com',
    companySize: 'Medium',
    industry: 'Education',
    verificationStatus: 'Verified',
  },
  {
    id: 45,
    companyName: 'GreenEnergy Co.',
    companyEmail: 'support@greenenergy.com',
    companySize: 'Small',
    industry: 'Other',
    verificationStatus: 'Pending',
  },
  {
    id: 46,
    companyName: 'TechNova Systems',
    companyEmail: 'contact@technova.com',
    companySize: 'Corporate',
    industry: 'Technology',
    verificationStatus: 'Rejected',
  },
  {
    id: 47,
    companyName: 'MediCare Solutions',
    companyEmail: 'info@medicare.com',
    companySize: 'Large',
    industry: 'Healthcare',
    verificationStatus: 'Verified',
  },
  {
    id: 48,
    companyName: 'WealthSync Financial',
    companyEmail: 'admin@wealthsync.com',
    companySize: 'Medium',
    industry: 'Finance',
    verificationStatus: 'Pending',
  },
  {
    id: 49,
    companyName: 'EduTrend Institute',
    companyEmail: 'support@edutrend.com',
    companySize: 'Small',
    industry: 'Education',
    verificationStatus: 'Rejected',
  },
  {
    id: 50,
    companyName: 'BioEnergy Ventures',
    companyEmail: 'contact@bioenergy.com',
    companySize: 'Medium',
    industry: 'Other',
    verificationStatus: 'Verified',
  },
  {
    id: 51,
    companyName: 'CloudTrend Technologies',
    companyEmail: 'info@cloudtrend.com',
    companySize: 'Large',
    industry: 'Technology',
    verificationStatus: 'Pending',
  },
  {
    id: 52,
    companyName: 'HealthWave Systems',
    companyEmail: 'support@healthwave.com',
    companySize: 'Corporate',
    industry: 'Healthcare',
    verificationStatus: 'Verified',
  },
  {
    id: 53,
    companyName: 'FinanceTrend Advisors',
    companyEmail: 'admin@financetrend.com',
    companySize: 'Small',
    industry: 'Finance',
    verificationStatus: 'Rejected',
  },
  {
    id: 54,
    companyName: 'SkillTrend Academy',
    companyEmail: 'contact@skilltrend.com',
    companySize: 'Medium',
    industry: 'Education',
    verificationStatus: 'Pending',
  },
  {
    id: 55,
    companyName: 'EcoEnergy Solutions',
    companyEmail: 'info@ecoenergy.com',
    companySize: 'Small',
    industry: 'Other',
    verificationStatus: 'Verified',
  },
  {
    id: 56,
    companyName: 'TechWave Innovations',
    companyEmail: 'support@techwave.com',
    companySize: 'Medium',
    industry: 'Technology',
    verificationStatus: 'Rejected',
  },
  {
    id: 57,
    companyName: 'CareTrend Medical',
    companyEmail: 'contact@caretrend.com',
    companySize: 'Large',
    industry: 'Healthcare',
    verificationStatus: 'Pending',
  },
  {
    id: 58,
    companyName: 'MoneyTrend Financial',
    companyEmail: 'admin@moneytrend.com',
    companySize: 'Corporate',
    industry: 'Finance',
    verificationStatus: 'Verified',
  },
  {
    id: 59,
    companyName: 'EduWave Institute',
    companyEmail: 'info@eduwave.com',
    companySize: 'Small',
    industry: 'Education',
    verificationStatus: 'Rejected',
  },
  {
    id: 60,
    companyName: 'GreenTrend Ventures',
    companyEmail: 'support@greentrend.com',
    companySize: 'Medium',
    industry: 'Other',
    verificationStatus: 'Pending',
  },
  {
    id: 61,
    companyName: 'DataTrend Technologies',
    companyEmail: 'contact@datatrend.com',
    companySize: 'Large',
    industry: 'Technology',
    verificationStatus: 'Verified',
  },
  {
    id: 62,
    companyName: 'HealthSync Solutions',
    companyEmail: 'info@healthsyncsolutions.com',
    companySize: 'Medium',
    industry: 'Healthcare',
    verificationStatus: 'Pending',
  },
  {
    id: 63,
    companyName: 'InvestTrend Group',
    companyEmail: 'admin@investtrend.com',
    companySize: 'Small',
    industry: 'Finance',
    verificationStatus: 'Rejected',
  },
  {
    id: 64,
    companyName: 'LearnTrend Academy',
    companyEmail: 'support@learntrend.com',
    companySize: 'Medium',
    industry: 'Education',
    verificationStatus: 'Verified',
  },
  {
    id: 65,
    companyName: 'CleanEnergy Ventures',
    companyEmail: 'contact@cleanenergyventures.com',
    companySize: 'Corporate',
    industry: 'Other',
    verificationStatus: 'Pending',
  },
  {
    id: 66,
    companyName: 'TechSync Systems',
    companyEmail: 'info@techsync.com',
    companySize: 'Large',
    industry: 'Technology',
    verificationStatus: 'Rejected',
  },
  {
    id: 67,
    companyName: 'MediTrend Health',
    companyEmail: 'support@meditrend.com',
    companySize: 'Medium',
    industry: 'Healthcare',
    verificationStatus: 'Verified',
  },
  {
    id: 68,
    companyName: 'WealthTrend Advisors',
    companyEmail: 'admin@wealthtrend.com',
    companySize: 'Small',
    industry: 'Finance',
    verificationStatus: 'Pending',
  },
  {
    id: 69,
    companyName: 'EduSync Institute',
    companyEmail: 'contact@edusync.com',
    companySize: 'Medium',
    industry: 'Education',
    verificationStatus: 'Rejected',
  },
  {
    id: 70,
    companyName: 'BioTrend Solutions',
    companyEmail: 'info@biotrend.com',
    companySize: 'Small',
    industry: 'Other',
    verificationStatus: 'Verified',
  },
  {
    id: 71,
    companyName: 'CloudSync Technologies',
    companyEmail: 'support@cloudsync.com',
    companySize: 'Corporate',
    industry: 'Technology',
    verificationStatus: 'Pending',
  },
  {
    id: 72,
    companyName: 'CareSync Medical',
    companyEmail: 'contact@caresync.com',
    companySize: 'Large',
    industry: 'Healthcare',
    verificationStatus: 'Verified',
  },
  {
    id: 73,
    companyName: 'MoneySync Financial',
    companyEmail: 'admin@moneysync.com',
    companySize: 'Medium',
    industry: 'Finance',
    verificationStatus: 'Rejected',
  },
  {
    id: 74,
    companyName: 'SkillSync Academy',
    companyEmail: 'info@skillsync.com',
    companySize: 'Small',
    industry: 'Education',
    verificationStatus: 'Pending',
  },
  {
    id: 75,
    companyName: 'EcoSync Ventures',
    companyEmail: 'support@ecosync.com',
    companySize: 'Medium',
    industry: 'Other',
    verificationStatus: 'Verified',
  },
  {
    id: 76,
    companyName: 'TechCore Innovations',
    companyEmail: 'contact@techcore.com',
    companySize: 'Large',
    industry: 'Technology',
    verificationStatus: 'Rejected',
  },
  {
    id: 77,
    companyName: 'HealthCore Systems',
    companyEmail: 'info@healthcoresystems.com',
    companySize: 'Corporate',
    industry: 'Healthcare',
    verificationStatus: 'Pending',
  },
  {
    id: 78,
    companyName: 'InvestCore Advisors',
    companyEmail: 'admin@investcore.com',
    companySize: 'Small',
    industry: 'Finance',
    verificationStatus: 'Verified',
  },
  {
    id: 79,
    companyName: 'LearnCore Institute',
    companyEmail: 'support@learncoreinstitute.com',
    companySize: 'Medium',
    industry: 'Education',
    verificationStatus: 'Rejected',
  },
  {
    id: 80,
    companyName: 'GreenCore Solutions',
    companyEmail: 'contact@greencore.com',
    companySize: 'Small',
    industry: 'Other',
    verificationStatus: 'Pending',
  },
];