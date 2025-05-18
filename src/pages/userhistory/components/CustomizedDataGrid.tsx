import * as React from 'react';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
import { columns, rows as initialRows } from '../internals/data/gridData';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import ShareIcon from '@mui/icons-material/Share';
import EmailIcon from '@mui/icons-material/Email';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Buttons from './Buttons';
import DialogueButtons from './DialogueButtons';
import EvaluationDialogue from './EvaluationDialogue';
import ReportDialogue from './ReportDialogue';
interface Job {
  id: number;
  jobTitle: string;
  companyName: string;
  companySize: string;
  industry: string;
  duration: number;
  date: string;
}

export default function CustomizedDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [openEvaluationDialog, setOpenEvaluationDialog] = React.useState(false);
  const [openReportDialog, setOpenReportDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const [evaluatedCompanies, setEvaluatedCompanies] = React.useState<Set<number>>(new Set());
  const navigate = useNavigate();

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
    setOpenSnackbar({ open: true, message: 'Link copied' });
  };

  const handleEmailClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.location.href = 'https://accounts.google.com/signin';
  };

  const handleDownloadClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const filePath = '../internals/data/REPORTREPORTREPORRTEPROTEOEPRORPTOPEROT.pdf';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'REPORTREPORTREPORRTEPROTEOEPRORPTOPEROT.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenSnackbar({ open: true, message: 'Downloading Document ...' });
  };

  const handleCompanyEvaluationClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenEvaluationDialog(true);
  };

  const handleCloseEvaluationDialog = () => {
    setOpenEvaluationDialog(false);
  };

  const handleEvaluationSubmit = () => {
    if (selectedJob) {
      setEvaluatedCompanies(prev => new Set(prev).add(selectedJob.id));
    }
    setOpenEvaluationDialog(false);
  };

  const handleInternshipReportClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenReportDialog(true);
  };

  const handleCloseReportDialog = () => {
    setOpenReportDialog(false);
  };

  // Define the new iconActions column
  const iconActionsColumn: GridColDef = {
    field: 'iconActions',
    headerName: '',
    width: 140,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: () => (
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
              borderRadius: 1, // Makes buttons square with slight rounding
              '&:hover': {
                backgroundColor: 'grey.500',
              },
            },
          }}
          buttons={[
            {
              icon: <ShareIcon sx={{ fontSize: '16px', color: 'text.primary' }} />,
              onClick: handleShareClick,
              ariaLabel: 'share',
              size: 'small',
            },
            {
              icon: <EmailIcon sx={{ fontSize: '16px', color: 'text.primary' }} />,
              onClick: handleEmailClick,
              ariaLabel: 'contact company',
              size: 'small',
            },
            {
              icon: <GetAppIcon sx={{ fontSize: '16px', color: 'text.primary' }} />,
              onClick: handleDownloadClick,
              ariaLabel: 'download report',
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
          '& .MuiIconButton-root': {
            borderRadius: 1, // Makes buttons square with slight rounding
            '&:hover': {
              backgroundColor: 'grey.500',
            },
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
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Date:</strong> {selectedJob.date}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DialogueButtons
              sx={{
                '& .MuiIconButton-root': {
                  backgroundColor: 'transparent',
                  border: '1px solid',
                  borderColor: 'text.primary',
                  borderRadius: 1,
                  p: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                },
              }}
              buttons={[
                {
                  icon: <ShareIcon sx={{ color: 'text.primary' }} />,
                  onClick: handleShareClick,
                  ariaLabel: 'share',
                },
                {
                  icon: <EmailIcon sx={{ color: 'text.primary' }} />,
                  onClick: handleEmailClick,
                  ariaLabel: 'contact company',
                },
                {
                  icon: <GetAppIcon sx={{ color: 'text.primary' }} />,
                  onClick: handleDownloadClick,
                  ariaLabel: 'download report',
                },
              ]}
            />
            <Button
              onClick={handleCompanyEvaluationClick}
              variant="contained"
              disabled={selectedJob && evaluatedCompanies.has(selectedJob.id)}
              sx={{ 
                ...(selectedJob && evaluatedCompanies.has(selectedJob.id) ? {
                  background: '#222222 !important',
                  color: '#fff !important',
                  '&.Mui-disabled': {
                    background: '#222222 !important',
                    color: '#fff !important',
                    opacity: '1 !important',
                  }
                } : {
                  background: 'primary.main',
                  color: 'primary.contrastText',
                }),
              }}
            >
              {selectedJob && evaluatedCompanies.has(selectedJob.id) ? 'Company Evaluated' : 'Company Evaluation'}
            </Button>
            <Button
              onClick={handleInternshipReportClick}
              variant="contained"
              sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
            >
              Internship Report
            </Button>
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
      <EvaluationDialogue
        open={openEvaluationDialog}
        onClose={handleCloseEvaluationDialog}
        onSubmit={handleEvaluationSubmit}
        companyName={selectedJob?.companyName}
      />
      <ReportDialogue
        open={openReportDialog}
        onClose={handleCloseReportDialog}
        companyName={selectedJob?.companyName}
      />
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar({ open: false, message: '' })}
        message={openSnackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}