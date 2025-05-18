import * as React from 'react';
import { DataGrid, GridCellParams, GridRowParams, GridActionsCellItem } from '@mui/x-data-grid';
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
      >
        {button.icon}
      </IconButton>
    ))}
  </Box>
);

export default function ReportDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [filteredRows, setFilteredRows] = React.useState(initialRows);
  const [selectedReport, setSelectedReport] = React.useState<Report | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: '',
  });

  // Search functionality
  React.useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = rows.filter((row) =>
      row.postedBy.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRows(filtered);
  }, [searchQuery, rows]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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

  const handleDownloadClick = (event: React.MouseEvent, id?: number) => {
    event.stopPropagation();
    const reportId = id || selectedReport?.id;
    if (reportId) {
      const filePath = `../internals/data/REPORT_${reportId}.pdf`;
      const link = document.createElement('a');
      link.href = filePath;
      link.download = `REPORT_${reportId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setOpenSnackbar({ open: true, message: 'Downloading Document ...' });
    }
  };

  const renderStatus = (params: GridCellParams) => {
    const status = params.value as string;
    const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
    return (
      <Box
        component="span"
        sx={{
          color: getStatusColor(status),
          fontWeight: 700,
        }}
      >
        {capitalizedStatus}
      </Box>
    );
  };

  // Add download column to the columns
  const columnsWithActions = [
    ...reportColumns.map((col) =>
      col.field === 'status'
        ? { ...col, renderCell: renderStatus }
        : col
    ),
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<DownloadIcon />}
          onClick={(event) => handleDownloadClick(event, params.id as number)}
          label="Download"
          showInMenu={false}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <TextField
        label="Search by Posted By"
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
        rows={filteredRows}
        columns={columnsWithActions}
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
          '& .MuiDataGrid-actionsCell': {
            gap: 0,
          },
        }}
      />
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
                    color: getStatusColor(selectedReport.status),
                    fontWeight: 700,
                  }}
                >
                  {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
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
            border: 0,
            boxShadow: 'none',
            elevation: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={(e) => handleDownloadClick(e)}>
              <DownloadIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              backgroundColor: 'background.paper',
              border: 0,
              padding: 0,
              margin: 0,
            }}
          >
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