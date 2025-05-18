import * as React from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { evaluationColumns as initialColumns, evaluationRows as initialRows } from '../internals/data/gridData';
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

interface Evaluation {
  id: number;
  studentDetails: string;
  companyName: string;
  mainSupervisor: string;
  startDate: string;
  endDate: string;
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

export default function EvaluationDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [filteredRows, setFilteredRows] = React.useState(initialRows);
  const [selectedEvaluation, setSelectedEvaluation] = React.useState<Evaluation | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: '',
  });

  // Add download action column to the initial columns
  const evaluationColumns = [
    ...initialColumns,
    {
      field: 'actions',
      headerName: '',
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            const filePath = `../internals/data/EVALUATION_${params.row.id}.pdf`;
            const link = document.createElement('a');
            link.href = filePath;
            link.download = `EVALUATION_${params.row.id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setOpenSnackbar({ open: true, message: 'Downloading Document ...' });
          }}
          aria-label="download"
          size="small"
          sx={{
            '&:hover': {
              animation: `${bounce} 0.5s`,
            },
          }}
        >
          <DownloadIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  // Search functionality
  React.useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = rows.filter((row) =>
      row.studentDetails.toLowerCase().includes(lowerCaseQuery)
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
    setSelectedEvaluation(params.row as Evaluation);
  };

  const handleCloseDialog = () => {
    setSelectedEvaluation(null);
  };

  const handleDownloadClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (selectedEvaluation) {
      const filePath = `../internals/data/EVALUATION_${selectedEvaluation.id}.pdf`;
      const link = document.createElement('a');
      link.href = filePath;
      link.download = `EVALUATION_${selectedEvaluation.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setOpenSnackbar({ open: true, message: 'Downloading Document ...' });
    }
  };

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
        rows={filteredRows}
        columns={evaluationColumns}
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
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
        }}
      />
      <Dialog
        open={!!selectedEvaluation}
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
          Internship Evaluation
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          {selectedEvaluation && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Student Details:</strong> {selectedEvaluation.studentDetails}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Company Name:</strong> {selectedEvaluation.companyName}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Main Supervisor:</strong> {selectedEvaluation.mainSupervisor}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Start Date:</strong> {selectedEvaluation.startDate}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>End Date:</strong> {selectedEvaluation.endDate}
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
                  icon: <DownloadIcon sx={{ color: 'text.primary' }} />,
                  onClick: handleDownloadClick,
                  ariaLabel: 'download evaluation',
                },
              ]}
            />
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