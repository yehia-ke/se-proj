import * as React from 'react';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Define company interface
interface Company {
  id: number;
  name: string;
  size: string;
  industry: string;
  email: string;  
  description?: string;
  location?: string;
  website?: string;
  contactPerson?: string;
  phoneNumber?: string;
}

interface CompanyGridProps {
  companies: Company[];
}

// Define columns for company data
const companyColumns: GridColDef[] = [
  { field: 'name', headerName: 'Company Name', width: 250, sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'size', headerName: 'Size', width: 150, sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'industry', headerName: 'Industry', width: 200, sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'email', headerName: 'Email', width: 250, sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
];

// Sample company data
const sampleCompanies: Company[] = [
  {
    id: 1,
    name: 'Tech Innovations Inc.',
    size: '50-200 employees',
    industry: 'Software Development',
    email: 'contact@techinnovations.com',
    description: 'Leading software development company specializing in enterprise solutions.',
    location: 'San Francisco, CA',
    website: 'www.techinnovations.com',
    contactPerson: 'Sarah Johnson',
    phoneNumber: '+1 (555) 123-4567'
  },
  {
    id: 2,
    name: 'Global Marketing Solutions',
    size: '200-500 employees',
    industry: 'Marketing',
    email: 'info@globalmarketing.com',
    description: 'Full-service marketing agency with global reach.',
    location: 'New York, NY',
    website: 'www.globalmarketing.com',
    contactPerson: 'Michael Chen',
    phoneNumber: '+1 (555) 987-6543'
  },
  {
    id: 3,
    name: 'EcoTech Systems',
    size: '10-50 employees',
    industry: 'Clean Energy',
    email: 'contact@ecotech.com',
    description: 'Developing innovative solutions for renewable energy.',
    location: 'Austin, TX',
    website: 'www.ecotech.com',
    contactPerson: 'Jessica Miller',
    phoneNumber: '+1 (555) 234-5678'
  },
  {
    id: 4,
    name: 'Financial Analytics Group',
    size: '500-1000 employees',
    industry: 'Finance',
    email: 'info@financialanalytics.com',
    description: 'Providing financial analysis and consulting services to Fortune 500 companies.',
    location: 'Chicago, IL',
    website: 'www.financialanalytics.com',
    contactPerson: 'Robert Williams',
    phoneNumber: '+1 (555) 345-6789'
  },
  {
    id: 5,
    name: 'HealthCare Solutions',
    size: '200-500 employees',
    industry: 'Healthcare',
    email: 'contact@healthcaresolutions.com',
    description: 'Developing innovative healthcare technologies and services.',
    location: 'Boston, MA',
    website: 'www.healthcaresolutions.com',
    contactPerson: 'Amanda Lopez',
    phoneNumber: '+1 (555) 456-7890'
  }
];

export default function CompanyGrid({ companies = sampleCompanies }: CompanyGridProps) {
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const [filteredCompanies, setFilteredCompanies] = React.useState(companies);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);

  // Update filtered companies when companies prop changes
  React.useEffect(() => {
    setFilteredCompanies(companies);
  }, [companies]);

  // Handle search filtering
  React.useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(lowerCaseQuery) ||
        company.industry.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCompanies(filtered);
  }, [searchQuery, companies]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedCompany(params.row as Company);
  };

  const handleCloseDialog = () => {
    setSelectedCompany(null);
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ width: '100%', pl: 0, pb: 2}}>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}
            aria-controls="companies-content"
            id="companies-header"
            sx={{'&:hover': { backgroundColor: 'action.hover' } ,backgroundColor: 'background.paper' }}>
          <Typography component="h2" variant="h6">Companies which viewed your profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Search by Company Name or Industry"
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
              '& .MuiInputLabel-outlined': {
                transform: 'translate(14px, 8px) scale(1)',
              },
              '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                transform: 'translate(14px, -6px) scale(0.75)',
                backgroundColor: 'background.paper',
                padding: '0 4px',
              },
            }}
          />
          <DataGrid
            rows={filteredCompanies}
            columns={companyColumns}
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
        </AccordionDetails>
      </Accordion>

      {/* Dialog for company details */}
      <Dialog
        open={!!selectedCompany}
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            minWidth: '500px',
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          Company Details: {selectedCompany?.name}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          {selectedCompany && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Company Name:</strong> {selectedCompany.name}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Size:</strong> {selectedCompany.size}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Industry:</strong> {selectedCompany.industry}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Email:</strong> {selectedCompany.email}
              </Typography>
              {selectedCompany.website && (
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Website:</strong> {selectedCompany.website}
                </Typography>
              )}
              {selectedCompany.location && (
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Location:</strong> {selectedCompany.location}
                </Typography>
              )}
              {selectedCompany.contactPerson && (
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Contact Person:</strong> {selectedCompany.contactPerson}
                </Typography>
              )}
              {selectedCompany.phoneNumber && (
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Phone Number:</strong> {selectedCompany.phoneNumber}
                </Typography>
              )}
              {selectedCompany.description && (
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Description:</strong> {selectedCompany.description}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ backgroundColor: 'background.paper' }}>
          <Button
            onClick={handleCloseDialog}
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