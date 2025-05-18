import * as React from 'react';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
import { draftColumns, draftRows } from '../internals/data/gridData';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Divider } from '@mui/material';
import Buttons from './Buttons';
import DialogueButtons from './DialogueButtons';
import EvaluationDialogue from './EvaluationDialogue';
import ReportDialogue from './ReportDialogue';
import FilledFinalizedReport from './FilledUNFinalizedReport';
import FilledEvaluation from './FilledEvaluation';

interface Draft {
  id: number;
  draftTitle: string;
  draftType: 'Evaluation' | 'Report';
  companyName: string;
  status: 'Finalized' | 'Unfinalized' | '-';
  lastEdit: string;
  evaluationData?: {
    reportTitle: string;
    title: string[];
    introduction: string;
    body: string;
    isFinalized: boolean;
  };
  reportData?: {
    reportTitle: string;
    content: string;
  };
}

export default function DraftsDataGrid() {
  const [rows, setRows] = React.useState(draftRows);
  const [selectedDraft, setSelectedDraft] = React.useState<Draft | null>(null);
  const [openFilledEvaluation, setOpenFilledEvaluation] = React.useState(false);
  const [openFilledFinalizedReport, setOpenFilledFinalizedReport] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [deleteDraftId, setDeleteDraftId] = React.useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity?: 'success' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.closest('button')) {
      return;
    }
    setSelectedDraft(params.row as Draft);
  };

  const handleCloseDialog = () => {
    setSelectedDraft(null);
  };

  const handleEditClick = (event: React.MouseEvent, draft: Draft) => {
    event.stopPropagation();
    if (draft.draftType === 'Evaluation') {
      setSelectedDraft(draft);
      setOpenFilledEvaluation(true);
    } else {
      setSelectedDraft(draft);
      setOpenFilledFinalizedReport(true);
    }
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

  const handleDeleteClick = (event: React.MouseEvent, draftId: number) => {
    event.stopPropagation();
    setDeleteDraftId(draftId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deleteDraftId !== null) {
      setRows(rows.filter((row) => row.id !== deleteDraftId));
      setOpenSnackbar({
        open: true,
        message: 'Document Deleted Successfully',
        severity: 'success',
      });
    }
    setOpenDeleteDialog(false);
    setDeleteDraftId(null);
    setSelectedDraft(null); // Close the draft details dialog
    setOpenFilledEvaluation(false); // Close the evaluation dialog
    setOpenFilledFinalizedReport(false); // Close the report dialog
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteDraftId(null);
  };

  const handleCloseFilledEvaluation = () => {
    setOpenFilledEvaluation(false);
    setSelectedDraft(null);
  };

  const handleCloseFilledFinalizedReport = () => {
    setOpenFilledFinalizedReport(false);
    setSelectedDraft(null);
  };

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
            },
          }}
          buttons={[
            {
              icon: <EditIcon sx={{ fontSize: '16px', color: 'text.primary' }} />,
              onClick: (event) => handleEditClick(event, params.row as Draft),
              ariaLabel: 'edit draft',
              size: 'small',
            },
            {
              icon: <DownloadIcon sx={{ fontSize: '16px', color: 'text.primary' }} />,
              onClick: handleDownloadClick,
              ariaLabel: 'download draft',
              size: 'small',
            },
            {
              icon: <DeleteIcon sx={{ fontSize: '16px', color: 'text.primary' }} />,
              onClick: (event) => handleDeleteClick(event, params.row.id),
              ariaLabel: 'delete draft',
              size: 'small',
            },
          ]}
        />
      </Box>
    ),
  };

  const columns = [...draftColumns, iconActionsColumn];

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
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
          '& .MuiIconButton-root:hover': {
            backgroundColor: 'grey.500',
          },
        }}
      />
      <Dialog
        open={!!selectedDraft}
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
          {selectedDraft?.draftTitle} - {selectedDraft?.draftType}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          {selectedDraft && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: 'text.primary' }}>
                <strong> Title:</strong> {selectedDraft.draftTitle}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong> Type:</strong> {selectedDraft.draftType}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Company Name:</strong> {selectedDraft.companyName}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Status:</strong> {selectedDraft.status}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Last Edit:</strong> {selectedDraft.lastEdit}
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
                  icon: <EditIcon sx={{ color: 'text.primary' }} />,
                  onClick: (event) => handleEditClick(event, selectedDraft!),
                  ariaLabel: 'edit draft',
                },
                {
                  icon: <DownloadIcon sx={{ color: 'text.primary' }} />,
                  onClick: handleDownloadClick,
                  ariaLabel: 'download draft',
                },
                {
                  icon: <DeleteIcon sx={{ color: 'text.primary' }} />,
                  onClick: (event) => handleDeleteClick(event, selectedDraft!.id),
                  ariaLabel: 'delete draft',
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
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            border: 0,
            boxShadow: 'none',
            elevation: 0,
          },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
          Delete Document?
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'background.paper' }}>
          <Typography sx={{ color: 'text.primary' }}>
            This action is irreversible! Once you delete this document you won’t be able to edit or post it later.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'background.paper', border: 0 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            variant="outlined"
            sx={{ color: 'text.primary', borderColor: 'divider' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{ backgroundColor: 'error.main', color: 'error.contrastText' }}
          >
            Delete Forever
          </Button>
        </DialogActions>
      </Dialog>
      <FilledEvaluation
        open={openFilledEvaluation}
        onClose={handleCloseFilledEvaluation}
        companyName={selectedDraft?.companyName}
        reportTitle={selectedDraft?.evaluationData?.reportTitle}
        title={selectedDraft?.evaluationData?.title}
        introduction={selectedDraft?.evaluationData?.introduction}
        body={selectedDraft?.evaluationData?.body}
        isFinalized={selectedDraft?.evaluationData?.isFinalized}
      />
      <FilledFinalizedReport
        open={openFilledFinalizedReport}
        onClose={handleCloseFilledFinalizedReport}
        companyName={selectedDraft?.companyName}
        reportTitle={selectedDraft?.reportData?.reportTitle}
        content={selectedDraft?.reportData?.content}
      />
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar({ open: false, message: '', severity: 'info' })}
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