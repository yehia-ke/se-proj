import * as React from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { columns, rows as initialRows, getStatusColor } from '../internals/data/gridData';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';

interface Student {
  id: number;
  studentName: string;
  membershipType: 'Pro' | 'Regular';
  internshipStatus: 'Pending' | 'Accepted' | 'Finalized' | 'Rejected';
  email: string;
  major: string;
  skills: string[];
  age: number;
  gender: string;
  phoneNumber: string;
  university: string;
  gpa: number;
  graduationYear: number;
  address: string;
  linkedIn: string;
  reportTitles: string[];
  evaluationTitles: string[];
}

// Dummy data (assumes initialRows is updated in gridData)
const updatedRows = initialRows.map((row, index) => ({
  ...row,
  age: [22, 21, 23, 20, 24][index % 5],
  gender: ['Male', 'Female', 'Female', 'Male', 'Non-Binary'][index % 5],
  phoneNumber: ['+1-555-123-4567', '+1-555-234-5678', '+1-555-345-6789', '+1-555-456-7890', '+1-555-567-8901'][index % 5],
  university: ['MIT', 'Stanford', 'Harvard', 'Caltech', 'UCLA'][index % 5],
  gpa: [3.8, 3.9, 3.7, 4.0, 3.6][index % 5],
  graduationYear: [2025, 2026, 2025, 2027, 2026][index % 5],
  address: [
    '123 Main St, Boston, MA',
    '456 Elm St, Palo Alto, CA',
    '789 Oak St, Cambridge, MA',
    '101 Pine St, Pasadena, CA',
    '202 Maple St, Los Angeles, CA',
  ][index % 5],
  linkedIn: [
    'linkedin.com/in/john-doe',
    'linkedin.com/in/jane-smith',
    'linkedin.com/in/alice-johnson',
    'linkedin.com/in/bob-brown',
    'linkedin.com/in/carol-white',
  ][index % 5],
  reportTitles: [
    ['Project Plan Report', 'Midterm Progress Report', 'Final Report'],
    ['Initial Proposal', 'Progress Update'],
    ['Research Summary', 'Internship Report'],
    ['Technical Report', 'Presentation Slides'],
    ['Weekly Update', 'Final Summary'],
  ][index % 5],
  evaluationTitles: [
    ['Midterm Evaluation', 'Final Evaluation'],
    ['Supervisor Feedback', 'Peer Review'],
    ['Performance Review'],
    ['Self-Assessment', 'Manager Evaluation'],
    ['Team Evaluation'],
  ][index % 5],
}));

export default function StudentsDataGrid() {
  const [rows, setRows] = React.useState(updatedRows);
  const [filteredRows, setFilteredRows] = React.useState(updatedRows);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [profileStudent, setProfileStudent] = React.useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Search functionality
  React.useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = rows.filter((row) =>
      row.studentName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRows(filtered);
  }, [searchQuery, rows]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedStudent(params.row as Student);
  };

  const handleCloseDialog = () => {
    setSelectedStudent(null);
  };

  const handleViewProfile = (student: Student) => {
    setProfileStudent(student);
  };

  const handleCloseProfileDialog = () => {
    setProfileStudent(null);
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}?subject=Internship%20Inquiry`;
  };

  const rowsWithProfileHandler = React.useMemo(() => {
    return updatedRows.map(row => ({
      ...row,
      onViewProfile: () => handleViewProfile(row),
    }));
  }, []);

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <TextField
        label="Search by Student Name"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        size="small"
        sx={{
          mb: 2,
          width: 300,
          transition: 'all 0.3s ease',
          '& .MuiOutlinedInput-root': {
            '&:focus-within': {
              outline: 'none',
            },
            '& fieldset': {
              borderColor: 'grey.500',
            },
            '&:hover fieldset': {
              borderColor: 'grey.700',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              outline: 'none',
            },
          },
          '&.Mui-focused': {
            mb: 1,
            transform: 'translateX(10px)',
          },
        }}
      />
      <DataGrid
        rows={filteredRows.map(row => ({
          ...row,
          onViewProfile: () => handleViewProfile(row),
        }))}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        rowHeight={60}
        onRowClick={handleRowClick}
        sx={{
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'transparent',
          },
          '& .MuiDataGrid-cellCheckbox': {
            display: 'none',
          },
        }}
      />
      {/* Existing Row Click Dialog */}
      <Dialog
        open={!!selectedStudent}
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            minWidth: '500px',
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          {selectedStudent?.studentName}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          {selectedStudent && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Student Name:</strong> {selectedStudent.studentName}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Membership Type:</strong> {selectedStudent.membershipType}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Internship Status:</strong>{' '}
                <Box
                  component="span"
                  sx={{
                    px: 1.2,
                    py: 0.3,
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    backgroundColor: getStatusColor(selectedStudent.internshipStatus),
                  }}
                >
                  {selectedStudent.internshipStatus}
                </Box>
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Email:</strong> {selectedStudent.email}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Major:</strong> {selectedStudent.major}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Skills:</strong> {selectedStudent.skills.join(', ')}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ backgroundColor: 'background.paper' }}>
          <Button
            onClick={() => handleViewProfile(selectedStudent!)}
            variant="contained"
            sx={{ color: 'common.white', backgroundColor: 'primary.main', mr: 1 }}
          >
            View Profile
          </Button>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ color: 'primary.main', borderColor: 'primary.main' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* New Profile Dialog */}
      <Dialog
        open={!!profileStudent}
        onClose={handleCloseProfileDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            minWidth: '600px',
            maxWidth: '800px',
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: 'background.paper', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {/* Placeholder for profile photo */}
              <Typography variant="h6" color="text.secondary">
                {profileStudent?.studentName.charAt(0)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="h6" sx={{ color: 'text.primary' }}>
                {profileStudent?.studentName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {profileStudent?.email}
                </Typography>
                <MailOutlineIcon
                  sx={{ color: 'primary.main', cursor: 'pointer', fontSize: '1.2rem' }}
                  onClick={() => handleEmailClick(profileStudent!.email)}
                />
              </Box>
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper', p: 3 }}>
          {profileStudent && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Student Details */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                  Student Details
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Membership Type:</strong> {profileStudent.membershipType}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Internship Status:</strong>{' '}
                  <Box
                    component="span"
                    sx={{
                      px: 1.2,
                      py: 0.3,
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      backgroundColor: getStatusColor(profileStudent.internshipStatus),
                    }}
                  >
                    {profileStudent.internshipStatus}
                  </Box>
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Major:</strong> {profileStudent.major}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Skills:</strong> {profileStudent.skills.join(', ')}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Age:</strong> {profileStudent.age}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Gender:</strong> {profileStudent.gender}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Phone Number:</strong> {profileStudent.phoneNumber}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>University:</strong> {profileStudent.university}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>GPA:</strong> {profileStudent.gpa.toFixed(2)}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Graduation Year:</strong> {profileStudent.graduationYear}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Address:</strong> {profileStudent.address}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>LinkedIn:</strong>{' '}
                  <a href={profileStudent.linkedIn} target="_blank" rel="noopener noreferrer">
                    {profileStudent.linkedIn}
                  </a>
                </Typography>
              </Box>
              {/* Reports Section */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                  Reports Submitted
                </Typography>
                <Box
                  sx={{
                    maxHeight: 150,
                    overflowY: 'auto',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  {profileStudent.reportTitles.length > 0 ? (
                    profileStudent.reportTitles.map((title, index) => (
                      <Typography key={index} sx={{ color: 'text.primary', py: 0.5 }}>
                        • {title}
                      </Typography>
                    ))
                  ) : (
                    <Typography sx={{ color: 'text.secondary' }}>
                      No reports submitted
                    </Typography>
                  )}
                </Box>
              </Box>
              {/* Evaluations Section */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                  Evaluations
                </Typography>
                <Box
                  sx={{
                    maxHeight: 150,
                    overflowY: 'auto',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  {profileStudent.evaluationTitles.length > 0 ? (
                    profileStudent.evaluationTitles.map((title, index) => (
                      <Typography key={index} sx={{ color: 'text.primary', py: 0.5 }}>
                        • {title}
                      </Typography>
                    ))
                  ) : (
                    <Typography sx={{ color: 'text.secondary' }}>
                      No evaluations available
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ backgroundColor: 'background.paper', p: 2 }}>
          <Button
            onClick={handleCloseProfileDialog}
            variant="outlined"
            sx={{ color: 'primary.main', borderColor: 'primary.main' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}