import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Divider } from '@mui/material';
import CompaniesViewedProfile from './CompaniesViewedProfile';
import OnlineAssessments from './OnlineAssessments';
import Workshops from './Workshops';
import AppointmentGrid from './AppointmentGrid';
import CallInScreen from './CallingScreen'; // Import the CallInScreen component

const UserDashboard: React.FC = () => {
  const location = useLocation();
  const isProUser = location.pathname === '/userdashboard/pro';
  const [callOpen, setCallOpen] = React.useState(false);

  React.useEffect(() => {
    if (isProUser) {
      setCallOpen(true);
    }
  }, [isProUser]);

  const appliedRows = [
    {
      id: 101,
      jobTitle: 'Software Engineer Intern',
      companyName: 'Tech Corp',
      companySize: 'Large',
      industry: 'Technology',
      duration: 12,
      status: 'Pending',
      paid: true,
      expectedSalary: 2000,
      skillsRequired: ['JavaScript', 'React'],
      jobDescription: 'Develop web applications',
    },
    {
      id: 102,
      jobTitle: 'Data Analyst Intern',
      companyName: 'Data Inc',
      companySize: 'Medium',
      industry: 'Analytics',
      duration: 8,
      status: 'Accepted',
      paid: false,
      skillsRequired: ['Python', 'SQL'],
      jobDescription: 'Analyze data sets',
    },
    {
      id: 103,
      jobTitle: 'Frontend Developer Intern',
      companyName: 'Web Solutions',
      companySize: 'Small',
      industry: 'Web Development',
      duration: 10,
      status: 'Finalized',
      paid: true,
      expectedSalary: 1500,
      skillsRequired: ['HTML', 'CSS', 'JavaScript'],
      jobDescription: 'Build responsive web interfaces',
    },
    {
      id: 104,
      jobTitle: 'Marketing Intern',
      companyName: 'Brand Boost',
      companySize: 'Medium',
      industry: 'Marketing',
      duration: 6,
      status: 'Rejected',
      paid: false,
      skillsRequired: ['SEO', 'Content Creation'],
      jobDescription: 'Assist in digital marketing campaigns',
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { sm: '100%', md: '1700px' },
      }}
    >
      {isProUser && (
        <>
          {/* Call Incoming Dialog */}
          <CallInScreen
            open={callOpen}
            onClose={() => setCallOpen(false)}
            caller="Supervisor John Doe"
          />

          <Grid size={{ xs: 12, lg: 9 }}>
            <CompaniesViewedProfile rows={appliedRows} />
          </Grid>

          <Grid size={{ xs: 12, lg: 9 }}>
            <OnlineAssessments />
          </Grid>

          <Grid size={{ xs: 12, lg: 9 }}>
            <Workshops />
          </Grid>

          <Grid size={{ xs: 12, lg: 9 }}>
            <AppointmentGrid />
          </Grid>
        </>
      )}
    </Box>
  );
};

export default UserDashboard;
