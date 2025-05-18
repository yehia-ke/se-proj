import * as React from 'react';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
import { postColumns, postRows } from '../internals/data/gridData';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Divider } from '@mui/material';
import Buttons from './Buttons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DialogueButtons from './DialogueButtons';

interface Post {
  id: number;
  postTitle: string;
  datePosted: string;
  evaluationData?: {
    reportTitle: string;
    title: string[];
    introduction: string;
    body: string;
  };
}

export default function PostsDataGrid() {
  const [rows, setRows] = React.useState(postRows);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [deletePostId, setDeletePostId] = React.useState<number | null>(null);
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
    setSelectedPost(params.row as Post);
  };

  const handleCloseDialog = () => {
    setSelectedPost(null);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDownloadClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const filePath = '../internals/data/EVALEVALEVALEVALEVALEVALEVALEVAL.pdf';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'EVALEVALEVALEVALEVALEVALEVALEVAL.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenSnackbar({ open: true, message: 'Downloading Document ...' });
  };

  const handleDeleteClick = (event: React.MouseEvent, postId: number) => {
    event.stopPropagation();
    setDeletePostId(postId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deletePostId !== null) {
      setRows(rows.filter((row) => row.id !== deletePostId));
      setOpenSnackbar({
        open: true,
        message: 'Document Deleted Successfully',
        severity: 'success',
      });
    }
    setOpenDeleteDialog(false);
    setDeletePostId(null);
    setSelectedPost(null);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeletePostId(null);
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
              icon: <DownloadIcon sx={{ fontSize: '16px', color: 'text.primary' }} />,
              onClick: handleDownloadClick,
              ariaLabel: 'download post',
              size: 'small',
            },
            {
              icon: <DeleteIcon sx={{ fontSize: '16px', color: 'text.primary' }} />,
              onClick: (event) => handleDeleteClick(event, params.row.id),
              ariaLabel: 'delete post',
              size: 'small',
            },
          ]}
        />
      </Box>
    ),
  };

  const columns = [...postColumns, iconActionsColumn];

  return (
    <Accordion
      expanded={expanded === 'posts'}
      onChange={handleChange('posts')}
      sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="posts-content"
        id="posts-header"
        sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
      >
        <Typography component="h2" variant="h6">
          Posted Evaluations
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 2 }}>
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
          open={!!selectedPost}
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
            {selectedPost?.postTitle}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ backgroundColor: 'background.paper' }}>
            {selectedPost && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Title:</strong> {selectedPost.postTitle}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Date Posted:</strong> {selectedPost.datePosted}
                </Typography>
                {selectedPost.evaluationData && (
                  <>
                    <Typography sx={{ color: 'text.primary' }}>
                      <strong>Report Title:</strong> {selectedPost.evaluationData.reportTitle}
                    </Typography>
                    <Typography sx={{ color: 'text.primary' }}>
                      <strong>Titles:</strong> {selectedPost.evaluationData.title.join(', ')}
                    </Typography>
                    <Typography sx={{ color: 'text.primary' }}>
                      <strong>Introduction:</strong> {selectedPost.evaluationData.introduction}
                    </Typography>
                    <Typography sx={{ color: 'text.primary' }}>
                      <strong>Body:</strong> {selectedPost.evaluationData.body}
                    </Typography>
                  </>
                )}
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
                  display: 'flex',
                  gap: 1,
                  '& .MuiIconButton-root': {
                    backgroundColor: 'transparent',
                    border: '1px solid',
                    borderColor: 'text.primary',
                    borderRadius: 1,
                    p: 0.8,
                    minWidth: 32,
                    minHeight: 32,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 16,
                  }
                }}
                buttons={[
                  {
                    icon: <DownloadIcon sx={{ color: 'text.primary' }} />,
                    onClick: handleDownloadClick,
                    ariaLabel: 'download post',
                  },
                  {
                    icon: <DeleteIcon sx={{ color: 'text.primary' }} />,
                    onClick: (event) => handleDeleteClick(event, selectedPost!.id),
                    ariaLabel: 'delete post',
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
      </AccordionDetails>

    </Accordion>
  );
}