import * as React from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { columns, rows as initialRows } from '../internals/data/gridData';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

interface Company {
  id: number;
  companyName: string;
  companyEmail: string;
  companySize: string;
  industry: string;
  verificationStatus: string;
}

export default function CustomizedDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [searchText, setSearchText] = React.useState('');
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const [expandedRowId, setExpandedRowId] = React.useState<number | null>(null);
  const [confirmDialog, setConfirmDialog] = React.useState<{
    open: boolean;
    action: 'accept' | 'reject' | null;
    id: number | null;
  }>({ open: false, action: null, id: null });

  const handleRemove = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.closest('button')) {
      return;
    }
    setExpandedRowId(expandedRowId === params.id ? null : params.id);
    setSelectedCompany(params.row as Company);
  };

  const handleCloseDialog = () => {
    setSelectedCompany(null);
    setExpandedRowId(null);
  };

  const handleOpenConfirmDialog = (id: number, action: 'accept' | 'reject') => {
    setConfirmDialog({ open: true, action, id });
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog({ open: false, action: null, id: null });
  };

  const handleConfirmAction = () => {
    if (confirmDialog.id !== null) {
      handleRemove(confirmDialog.id);
    }
    handleCloseConfirmDialog();
  };

  const filteredRows = rows.filter(row =>
    row.companyName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        label="Search Company Name"
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
      <DataGrid
        rows={filteredRows}
        columns={columns.map(col =>
          col.field === 'actions'
            ? {
                ...col,
                onRemove: (id: number, action: 'accept' | 'reject') => handleOpenConfirmDialog(id, action),
              }
            : col
        )}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        rowHeight={60}
        onRowClick={handleRowClick}
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
        }}
      />
      <Dialog
        open={!!selectedCompany}
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          {selectedCompany?.companyName} Details
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          {selectedCompany && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Company Name:</strong> {selectedCompany.companyName}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Email:</strong> {selectedCompany.companyEmail}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Company Size:</strong> {selectedCompany.companySize}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Industry:</strong> {selectedCompany.industry}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Verification Status:</strong> {selectedCompany.verificationStatus}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ backgroundColor: 'background.paper' }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDialog.open}
        onClose={handleCloseConfirmDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          Confirm {confirmDialog.action === 'accept' ? 'Acceptance' : 'Rejection'}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          <Typography sx={{ color: 'text.primary' }}>
            Are you sure you want to {confirmDialog.action === 'accept' ? 'accept' : 'reject'} this company?
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ backgroundColor: 'background.paper' }}>
          <Button
            onClick={handleCloseConfirmDialog}
            variant="outlined"
            sx={{ color: 'text.primary', borderColor: 'grey.500' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            variant="contained"
            sx={{
              backgroundColor: confirmDialog.action === 'accept' ? 'primary.main' : 'error.main',
              color: 'primary.contrastText',
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}