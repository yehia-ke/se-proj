import * as React from 'react';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

// Define the EvaluationReport interface
interface EvaluationReport {
  id: number;
  studentName: string;
  companyName: string;
  supervisor: string;
  startDate: string;
  endDate: string;
  reportDetails: string;
  studentEmail: string;
  studentPhone: string;
}

// Dummy data with supervisor always "Riley Carter"
const initialReports: EvaluationReport[] = [
  {
    id: 1,
    studentName: 'John Doe',
    companyName: 'TechCorp Solutions',
    supervisor: 'Riley Carter',
    startDate: '2024-05-01',
    endDate: '2024-08-01',
    reportDetails: 'Completed 3-month internship focusing on software development and cloud integration.',
    studentEmail: 'john.doe@email.com',
    studentPhone: '555-1234',
  },
  {
    id: 2,
    studentName: 'Alice Johnson',
    companyName: 'DesignHub Innovations',
    supervisor: 'Riley Carter',
    startDate: '2024-06-01',
    endDate: '2024-09-01',
    reportDetails: 'Worked on UI/UX design and prototyping for mobile applications.',
    studentEmail: 'alice.johnson@email.com',
    studentPhone: '555-5678',
  },
  {
    id: 3,
    studentName: 'Bob Martin',
    companyName: 'DataWorks Analytics',
    supervisor: 'Riley Carter',
    startDate: '2024-07-01',
    endDate: '2024-10-01',
    reportDetails: 'Focused on data analysis and machine learning algorithms.',
    studentEmail: 'bob.martin@email.com',
    studentPhone: '555-9101',
  },
  {
    id: 4,
    studentName: 'Emma Wilson',
    companyName: 'CyberSecure Systems',
    supervisor: 'Riley Carter',
    startDate: '2024-04-15',
    endDate: '2024-07-15',
    reportDetails: 'Contributed to cybersecurity protocols and penetration testing.',
    studentEmail: 'emma.wilson@email.com',
    studentPhone: '555-1122',
  },
  {
    id: 5,
    studentName: 'Liam Brown',
    companyName: 'GreenTech Innovations',
    supervisor: 'Riley Carter',
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    reportDetails: 'Developed sustainable tech solutions for energy management.',
    studentEmail: 'liam.brown@email.com',
    studentPhone: '555-3344',
  },
  {
    id: 6,
    studentName: 'Sophia Davis',
    companyName: 'HealthTech Labs',
    supervisor: 'Riley Carter',
    startDate: '2024-08-01',
    endDate: '2024-11-01',
    reportDetails: 'Assisted in developing health monitoring applications.',
    studentEmail: 'sophia.davis@email.com',
    studentPhone: '555-5566',
  },
  {
    id: 7,
    studentName: 'Noah Clark',
    companyName: 'AI Dynamics',
    supervisor: 'Riley Carter',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    reportDetails: 'Worked on AI model training and optimization.',
    studentEmail: 'noah.clark@email.com',
    studentPhone: '555-7788',
  },
];

// Define columns for the DataGrid
const evaluationColumns: GridColDef[] = [
  {
    field: 'studentName',
    headerName: 'Student Name',
    flex: 1,
    minWidth: 200, // Ensure column contributes to overflow
    sortable: true,
    cellClassName: 'center-cell',
    headerAlign: 'center',
  },
  {
    field: 'companyName',
    headerName: 'Company',
    flex: 1,
    minWidth: 250,
    sortable: true,
    cellClassName: 'center-cell',
    headerAlign: 'center',
  },
  {
    field: 'supervisor',
    headerName: 'Supervisor',
    flex: 1,
    minWidth: 200,
    sortable: true,
    cellClassName: 'center-cell',
    headerAlign: 'center',
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    flex: 1,
    minWidth: 150,
    sortable: true,
    cellClassName: 'center-cell',
    headerAlign: 'center', // Restore for consistency
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    flex: 1,
    minWidth: 150,
    sortable: true,
    cellClassName: 'center-cell',
    headerAlign: 'center', // Restore for consistency
  },
];

// Custom Pagination Footer Component
const CustomPaginationFooter: React.FC<{
  page: number;
  pageSize: number;
  rowCount: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}> = ({ page, pageSize, rowCount, onPageChange, onPageSizeChange }) => {
  const pageCount = Math.ceil(rowCount / pageSize);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          Rows per page:
        </Typography>
        <TextField
          select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          size="small"
          SelectProps={{ native: true }}
          sx={{ width: 80 }}
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </TextField>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {`${page * pageSize + 1}–${Math.min((page + 1) * pageSize, rowCount)} of ${rowCount}`}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          variant="outlined"
          size="small"
        >
          Previous
        </Button>
        <Button
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(page + 1)}
          variant="outlined"
          size="small"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

// ReportDialog component for displaying report details
const ReportDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  report: EvaluationReport | null;
}> = ({ open, onClose, report }) => (
  <Dialog
    open={open}
    onClose={onClose}
    sx={{
      '& .MuiDialog-paper': {
        backgroundColor: 'background.paper',
      },
    }}
  >
    <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
      {report?.studentName}'s Report
    </DialogTitle>
    <Divider />
    <DialogContent sx={{ backgroundColor: 'background.paper' }}>
      {report && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ color: 'text.primary' }}>
            <strong>Student Name:</strong> {report.studentName}
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>
            <strong>Company Name:</strong> {report.companyName}
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>
            <strong>Supervisor:</strong> {report.supervisor}
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>
            <strong>Start Date:</strong> {report.startDate}
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>
            <strong>End Date:</strong> {report.endDate}
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>
            <strong>Report Details:</strong> {report.reportDetails}
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>
            <strong>Student Email:</strong> {report.studentEmail}
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>
            <strong>Student Phone:</strong> {report.studentPhone}
          </Typography>
        </Box>
      )}
    </DialogContent>
    <Divider />
    <DialogActions sx={{ backgroundColor: 'background.paper' }}>
      <Button
        onClick={onClose}
        variant="contained"
        sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

// Main EvaluationReportTable component
export default function EvaluationReportTable() {
  const [rows] = React.useState(initialReports);
  const [searchText, setSearchText] = React.useState('');
  const [selectedReport, setSelectedReport] = React.useState<EvaluationReport | null>(null);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(0); // Reset to first page on search
  };

  // Handle row click to open dialog
  const handleRowClick = (params: GridRowParams) => {
    setSelectedReport(params.row as EvaluationReport);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setSelectedReport(null);
  };

  // Filter rows based on search text
  const filteredRows = rows.filter((row) =>
    row.studentName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0); // Reset to first page
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Accordion
        sx={{
          mb: 2,
          border: '1px solid',
          borderColor: 'divider',
          transition: 'background-color 0.3s ease',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            '&:hover': {
              backgroundColor: 'background.paper',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
            Evaluation Reports
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: 'background.default',
            p: 2,
            '&:hover': {
              backgroundColor: 'background.paper',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <TextField
              label="Search Student Name"
              variant="outlined"
              value={searchText}
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
                  transform: 'translateX(-10px)',
                },
              }}
            />
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <DataGrid
                rows={filteredRows.slice(page * pageSize, (page + 1) * pageSize)}
                columns={evaluationColumns}
                getRowClassName={(params) =>
                  params.row.id === rows[rows.length - 1].id ? 'last-row' : ''
                }
                disableColumnResize
                rowHeight={60}
                onRowClick={handleRowClick}
                hideFooter // Hide default footer to use custom pagination
                sx={{
                  '& .MuiDataGrid-row:hover': {
                    cursor: 'pointer',
                    backgroundColor: 'background.default',
                    transition: 'background-color 0.3s ease',
                  },
                  '& .MuiDataGrid-row.Mui-selected': {
                    backgroundColor: 'transparent',
                  },
                  '& .MuiDataGrid-cellCheckbox': {
                    display: 'none',
                  },
                  '& .center-cell': {
                    textAlign: 'center',
                    whiteSpace: 'nowrap', // Prevent text wrapping to ensure overflow
                    padding: '0 8px',
                  },
                  '& .last-row': {
                    backgroundColor: '#f0f0f0', // Distinct style for the last row
                  },

                }}
              />
            </Box>
            <CustomPaginationFooter
              page={page}
              pageSize={pageSize}
              rowCount={filteredRows.length}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <ReportDialog open={!!selectedReport} onClose={handleCloseDialog} report={selectedReport} />
    </Box>
  );
}