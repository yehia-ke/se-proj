import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridCellParams, GridRowParams } from '@mui/x-data-grid';
import { reportColumns, reportRows as initialRows, getStatusColor } from '../internals/data/gridData';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import DownloadIcon from '@mui/icons-material/Download';
import { keyframes } from '@mui/material';

interface Report {
  id: number;
  reportTitle: string;
  postedBy: string;
  major: string;
  status: 'accepted' | 'rejected' | 'flagged' | 'pending';
  datePosted: string;
}

const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const DialogueButtons = ({ buttons, sx }: { buttons: Array<{ icon: React.ReactElement; onClick: (event: React.MouseEvent) => void; ariaLabel: string; size?: 'small' | 'medium' | 'large' }>; sx?: object }) => (
  <Box sx={{ display: 'flex', gap: 1, ...sx }}>
    {buttons.map((button, index) => (
      <IconButton
        key={index}
        onClick={button.onClick}
        aria-label={button.ariaLabel}
        size={button.size || 'medium'}
        sx={{ borderRadius: 1 }}
      >
        {button.icon}
      </IconButton>
    ))}
  </Box>
);

export default function ReportDataGrid() {
  const theme = useTheme();
  const [rows, setRows] = React.useState(initialRows);
  const [filteredRows, setFilteredRows] = React.useState(initialRows);
  const [selectedReport, setSelectedReport] = React.useState<Report | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [reportStatuses, setReportStatuses] = React.useState<{
    [key: number]: 'accepted' | 'rejected' | 'flagged' | 'pending';
  }>({});
  const [openSnackbar, setOpenSnackbar] = React.useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: '',
  });
  const [rejectDialogOpen, setRejectDialogOpen] = React.useState(false);
  const [clarificationMessage, setClarificationMessage] = React.useState('');
  const [selectedReportId, setSelectedReportId] = React.useState<number | null>(null);
  const [statusFilter, setStatusFilter] = React.useState('');  // Changed to empty string

  // Search functionality
  React.useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const lowerCaseStatus = statusFilter.toLowerCase();
    const filtered = rows.filter((row) =>
      row.postedBy.toLowerCase().includes(lowerCaseQuery) &&
      (lowerCaseStatus === '' || row.status.toLowerCase().includes(lowerCaseStatus))
    );
    setFilteredRows(filtered);
  }, [searchQuery, rows, statusFilter]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilter(event.target.value.toLowerCase());
  };

  const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.closest('button')) {
      return;
    }
    setSelectedReport(params.row as Report);
  };

  const handleCloseDialog = () => {
    setSelectedReport(null);
  };

  const handleStatusChange = (id: number, status: 'accepted' | 'rejected' | 'flagged' | 'pending' | null) => {
    setReportStatuses((prev) => ({
      ...prev,
      [id]: status || 'pending',
    }));
  };

  const handleDownloadClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (selectedReport) {
      const filePath = `../internals/data/REPORT_${selectedReport.id}.pdf`;
      const link = document.createElement('a');
      link.href = filePath;
      link.download = `REPORT_${selectedReport.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setOpenSnackbar({ open: true, message: 'Downloading Document ...' });
    }
  };

  const renderStatusButtons = (params: GridCellParams) => {
    const id = params.row.id;
    const currentStatus = reportStatuses[id] || params.row.status;
    const buttons = [
      { status: 'accepted', label: 'Accept', color: 'success' },
      { status: 'rejected', label: 'Reject', color: 'error' },
      { status: 'flagged', label: 'Flag', color: 'warning' },
    ];

    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', height: '100%', width: '100%' }}>
        {buttons.map(({ status, label, color }) => {
          const isActive = currentStatus === status;
          return (
            <Button
              key={status}
              variant="contained"
              size="small"
              color={isActive ? color : 'primary'}
              onClick={(event) => {
                event.stopPropagation();
                if (status === 'rejected' && !isActive) {
                  setSelectedReportId(id);
                  setRejectDialogOpen(true);
                } else {
                  handleStatusChange(id, isActive ? null : status);
                }
              }}
              style={{
                padding: '6px 16px',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease-in-out',
                minWidth: '100px',
              }}
              sx={{
                '&:hover': {
                  transform: isActive ? undefined : 'scale(1.05)',
                },
                '&:active': {
                  animation: `${bounce} 0.2s ease-in-out`,
                },
              }}
            >
              <span>
                {isActive ? (status === 'flagged' ? 'Flagged' : `${label}ed`) : label}
              </span>
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        mb: 2 
      }}>
        <TextField
          label="Search by Posted By"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          sx={{ width: 300 }}
        />
        <TextField
          label="Filter by Status"
          variant="outlined"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          size="small"
          placeholder="Search status..."
          sx={{ width: 200 }}
        />
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={reportColumns.map((col) =>
          col.field === 'status'
            ? { ...col, renderCell: renderStatusButtons }
            : col
        )}
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

      {/* Reject Clarification Dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            minWidth: '600px',
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          Submit Clarification for Rejection
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            backgroundColor: 'background.paper',
            overflowY: 'auto',
            maxHeight: '70vh',
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={1}
            value={clarificationMessage}
            onChange={(e) => setClarificationMessage(e.target.value)}
            sx={{
              mb: 2,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              boxShadow: '0px 2px 5px rgba(200, 200, 200, 0.4)',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary',
            }}
          >
            Please provide a detailed reason for rejecting this report.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'background.paper' }}>
          <Button
            onClick={() => {
              setRejectDialogOpen(false);
              setClarificationMessage('');
            }}
            variant="contained"
            sx={{
              backgroundColor: 'secondary.main',
              color: theme.palette.getContrastText(theme.palette.secondary.main),
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedReportId !== null) {
                handleStatusChange(selectedReportId, 'rejected');
                setClarificationMessage('');
                setRejectDialogOpen(false);
              }
            }}
            color="primary"
            disabled={!clarificationMessage.trim()}
            variant="contained"
            sx={{
              backgroundColor: 'secondary.main',
              color: theme.palette.getContrastText(theme.palette.secondary.main),
            }}
          >
            Submit Clarification
          </Button>
        </DialogActions>
      </Dialog>

      {/* Report Details Dialog */}
      <Dialog
        open={!!selectedReport}
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            minWidth: '500px',
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
          {selectedReport?.reportTitle}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          {selectedReport && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Report Title:</strong> {selectedReport.reportTitle}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Posted By:</strong> {selectedReport.postedBy}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Major:</strong> {selectedReport.major}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Status:</strong>{' '}
                <Box
                  component="span"
                  sx={{
                    px: 1.2,
                    py: 0.3,
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    backgroundColor: getStatusColor(reportStatuses[selectedReport.id] || selectedReport.status),
                  }}
                >
                  {reportStatuses[selectedReport.id] || selectedReport.status}
                </Box>
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Date Posted:</strong> {selectedReport.datePosted}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DialogueButtons
            sx={{
              '& .MuiIconButton-root': {
                backgroundColor: 'transparent',
                border: '1px solid white',
                borderRadius: '50%',
                p: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              },
            }}
            buttons={[
              {
                icon: <DownloadIcon sx={{ color: 'white' }} />,
                onClick: handleDownloadClick,
                ariaLabel: 'download report',
              },
            ]}
          />
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'white',
            px: 2,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Box component="span" sx={{ color: 'black', fontWeight: 500 }}>
            {openSnackbar.message}
          </Box>
        </Box>
      </Snackbar>
    </Box>
  );
}