import * as React from 'react';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
import { columns, rowsInProgress } from '../internals/data/gridData';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import ShareIcon from '@mui/icons-material/Share';
import ReportIcon from '@mui/icons-material/Report';
import EmailIcon from '@mui/icons-material/Email';
import { Divider, IconButton } from '@mui/material';
import Buttons from './Buttons';
import DialogueButtons from './DialogueButtons';
import ReportingConfirmation from './ReportingConfirmation';

interface Job {
  id: number;
  jobTitle: string;
  companyName: string;
  companySize: string;
  industry: string;
  duration: number;
}

export default function InProgressDataGrid() {
  const [rows, setRows] = React.useState(rowsInProgress);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openReportDialog, setOpenReportDialog] = React.useState(false);
  const [reportCompanyName, setReportCompanyName] = React.useState<string>('');

  const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.closest('button')) {
      return;
    }
    setSelectedJob(params.row as Job);
  };

  const handleCloseDialog = () => {
    setSelectedJob(null);
  };

  const handleShareClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleReportClick = (event: React.MouseEvent, companyName: string) => {
    event.stopPropagation();
    setReportCompanyName(companyName);
    setOpenReportDialog(true);
  };

  const handleCloseReportDialog = () => {
    setOpenReportDialog(false);
    setReportCompanyName('');
  };

  const handleEmailClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.location.href = 'https://accounts.google.com/signin';
  };

  // Define the new iconActions column
  const iconActionsColumn: GridColDef = {
    field: 'iconActions',
    headerName: '',
    width: 140,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          height: '100%',
          paddingRight: 2.5,
        }}
      >
        <Buttons
          sx={{
            '& .MuiIconButton-root': {
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'grey.500',
              },
            },
          }}
          buttons={[
            {
              icon: <ShareIcon/>,
              onClick: handleShareClick,
              ariaLabel: 'share',
              size: 'small',
            },
            {
              icon: <EmailIcon/>,
              onClick: handleEmailClick,
              ariaLabel: 'contact company',
              size: 'small',
            },
            {
              icon: <ReportIcon/>,
              onClick: (event: React.MouseEvent) => handleReportClick(event, params.row.companyName),
              ariaLabel: 'report company',
              size: 'small',
            },
          ]}
        />
      </Box>
    ),
  };

  // Filter out the 'actions' column and add iconActions
  const filteredColumns = [...columns.filter(col => col.field !== 'actions'), iconActionsColumn];

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={filteredColumns}
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
          '& .MuiIconButton-root:hover': {
            backgroundColor: 'grey.500',
          },
        }}
      />
      <Dialog 
        open={!!selectedJob} 
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            border: 0,
            boxShadow: 'none',
            elevation: 0,
          },
          '& .MuiIconButton-root:hover': {
            backgroundColor: 'grey.500',
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          {selectedJob?.companyName} - {selectedJob?.jobTitle}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          {selectedJob && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Job Title:</strong> {selectedJob.jobTitle}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Company Name:</strong> {selectedJob.companyName}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Company Size:</strong> {selectedJob.companySize}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Industry:</strong> {selectedJob.industry}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Duration (Weeks):</strong> {selectedJob.duration}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ 
          backgroundColor: 'background.paper', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          border: 0,
          boxShadow: 'none',
          elevation: 0,
        }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            backgroundColor: 'background.paper', 
            border: 0, 
            padding: 0, 
            margin: 0 
          }}>
            <IconButton onClick={handleShareClick} aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton onClick={handleEmailClick} aria-label="share">
              <EmailIcon />
            </IconButton>
            <IconButton onClick={(event: React.MouseEvent) => handleReportClick(event, selectedJob?.companyName || '')} aria-label="share">
              <ReportIcon />
            </IconButton>
          </Box>
          <Box sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            justifyContent: 'flex-end', 
            backgroundColor: 'background.paper', 
            border: 0, 
            padding: 0, 
            margin: 0 
          }}>
            <Button 
              onClick={handleCloseDialog} 
              variant="contained" 
              sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
            >
              Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <ReportingConfirmation
        open={openReportDialog}
        onClose={handleCloseReportDialog}
        companyName={reportCompanyName}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Link copied"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}