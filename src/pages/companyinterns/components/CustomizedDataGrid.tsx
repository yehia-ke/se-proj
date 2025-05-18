/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DataGrid, GridCellParams, GridRowParams } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { internColumns } from '../internals/data/customizedGridData';
import Snackbar from '@mui/material/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Buttons from './Buttons';
import EvaluationDialogue from './EvaluationDialogue';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  skills: string[];
}

interface Application {
  id: number;
  jobTitle: string;
  name: string;
  applicationDetails: Applicant;
}

interface Props {
  rows: Application[];
  onRemove?: (id: number) => void;
}

export default function CustomizedDataGrid({ rows, onRemove }: Props) {
  const [selectedApp, setSelectedApplication] = React.useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [applicationDialogOpen, setApplicationDialogOpen] = React.useState(false);
  const [currentInterns, setCurrentInterns] = React.useState<Set<number>>(new Set(rows.map(row => row.id)));
  const [completedInterns, setCompletedInterns] = React.useState<Set<number>>(new Set());
  const [evaluatedInterns, setEvaluatedInterns] = React.useState<Set<number>>(new Set());
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [internToRemove, setInternToRemove] = React.useState<number | null>(null);
  const [removalTimeout, setRemovalTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const [localRows, setLocalRows] = React.useState<Application[]>(rows);
  const [filterType, setFilterType] = React.useState<'all' | 'currentNotCompleted' | 'currentCompleted'>('all');
  const [pendingRemoval, setPendingRemoval] = React.useState<number | null>(null);
  const [openEvaluationDialog, setOpenEvaluationDialog] = React.useState(false);
  const [selectedInternName, setSelectedInternName] = React.useState('');
  const [evaluatingInternId, setEvaluatingInternId] = React.useState<number | null>(null);

  const handleInternEvaluationClick = (event: React.MouseEvent, params: GridCellParams) => {
    event.stopPropagation();
    const internId = params.row.id as number;
    const studentName = params.row.name;
    setEvaluatingInternId(internId);
    setSelectedInternName(studentName);
    setOpenEvaluationDialog(true);
  };

  const handleEvaluationSubmit = () => {
    if (evaluatingInternId !== null) {
      setEvaluatedInterns(prev => new Set(prev).add(evaluatingInternId));
      setOpenEvaluationDialog(false);
      setEvaluatingInternId(null);
    }
  };

  const handleCloseEvaluationDialog = () => {
    setOpenEvaluationDialog(false);
    setSelectedInternName('');
    setEvaluatingInternId(null);
  };

  const iconActionsColumn = React.useMemo(() => ({
    field: 'iconActions',
    headerName: '',
    width: 20,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridCellParams) => {
      const id = params.row.id as number;
      const isCompleted = completedInterns.has(id);
      const isEvaluated = evaluatedInterns.has(id);

      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            height: '100%',
            paddingRight: 2.5,
          }}
        >
          {isCompleted && (
            <Buttons
              sx={{
                display: 'flex',
                '& .MuiIconButton-root': {
                  backgroundColor: 'transparent',
                  borderRadius: '10px',
                  padding: '6px',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                },
              }}
              buttons={[
                {
                  icon: <EditDocumentIcon sx={{
                    fontSize: '16px',
                    color: isEvaluated ? 'text.disabled' : 'primary.contrast'
                  }} />,
                  onClick: (event) => handleInternEvaluationClick(event, params),
                  ariaLabel: 'evaluate',
                  size: 'small',
                  disabled: isEvaluated,
                },
              ]}
            />
          )}
        </Box>
      );
    },
  }), [completedInterns, evaluatedInterns]);

  // Filter rows based on search query and filter type
  const filteredRows = React.useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    let filtered = localRows.filter((row) =>
      row.jobTitle.toLowerCase().includes(lowerCaseQuery) ||
      row.name.toLowerCase().includes(lowerCaseQuery)
    );

    if (filterType === 'currentNotCompleted') {
      filtered = filtered.filter(row => currentInterns.has(row.id) && !completedInterns.has(row.id));
    } else if (filterType === 'currentCompleted') {
      filtered = filtered.filter(row => currentInterns.has(row.id) && completedInterns.has(row.id));
    }

    return filtered;
  }, [searchQuery, localRows, filterType, currentInterns, completedInterns]);

  const handleCurrentInternToggle = (id: number) => {
    if (pendingRemoval === id) {
      if (removalTimeout) clearTimeout(removalTimeout);
      setPendingRemoval(null);
      setInternToRemove(null);
      setOpenSnackbar(false);
      setCurrentInterns(prev => new Set(prev).add(id));
    } else {
      setCurrentInterns(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
          setPendingRemoval(id);
          setOpenSnackbar(true);
          setInternToRemove(id);
          if (!onRemove) {
            const timeout = setTimeout(() => {
              setLocalRows(prevRows => prevRows.filter(row => row.id !== id));
              setPendingRemoval(null);
            }, 2000);
            setRemovalTimeout(timeout);
          }
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    }
  };

  const handleInternshipComplete = (id: number) => {
    setCompletedInterns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleUndo = () => {
    setOpenSnackbar(false);
    if (removalTimeout) clearTimeout(removalTimeout);
    if (internToRemove !== null) {
      setCurrentInterns(prev => new Set(prev).add(internToRemove));
      setPendingRemoval(null);
    }
    setInternToRemove(null);
  };

  const handleSnackbarExited = () => {
    if (internToRemove !== null && pendingRemoval === internToRemove) {
      if (onRemove) {
        onRemove(internToRemove);
      } else {
        setLocalRows(prev => prev.filter(row => row.id !== internToRemove));
      }
      setPendingRemoval(null);
      setInternToRemove(null);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedApplication(params.row as Application);
    setApplicationDialogOpen(true);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="in-progress-internships-content"
        id="in-progress-internships-header"
        sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
      >
        <Typography component="h2" variant="h6">All Interns</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: '100%', p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              label="Search by Job Title or Intern Name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              sx={{
                mb: 2,
                width: 300,
                transition: 'all 0.3s ease',
                '& .MuiOutlinedInput-root': {
                  '&:focus-within': { outline: 'none' },
                  '& fieldset': { borderColor: 'grey.500' },
                  '&:hover fieldset': { borderColor: 'grey.700' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.main', outline: 'none' },
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
            <FormControl sx={{ minWidth: 200 }}>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'currentNotCompleted' | 'currentCompleted')}
                displayEmpty
                inputProps={{ 'aria-label': 'Filter interns' }}
              >
                <MenuItem value="all">All Interns</MenuItem>
                <MenuItem value="currentNotCompleted">Current Interns (Not Completed)</MenuItem>
                <MenuItem value="currentCompleted">Current Interns (Completed)</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <DataGrid
            rows={filteredRows}
            columns={[...internColumns.map(col => {
              if (col.field === 'actions') {
                return {
                  ...col,
                  renderCell: (params: GridCellParams) => {
                    const id = params.row.id;
                    const isCurrentIntern = currentInterns.has(id);
                    const isCompleted = completedInterns.has(id);
                    return (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Button
                          variant="contained"
                          size="small"
                          color={isCurrentIntern ? 'error' : 'success'}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleCurrentInternToggle(id);
                          }}
                          sx={{ width: '175px', whiteSpace: 'nowrap' }}
                        >
                          {isCurrentIntern ? 'Remove Current Intern' : 'Undo'}
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color={isCompleted ? 'success' : 'primary'}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleInternshipComplete(id);
                          }}
                          sx={{ width: '175px', whiteSpace: 'nowrap' }}
                        >
                          {isCompleted ? 'Internship Completed' : 'Mark as Completed'}
                        </Button>
                      </div>
                    );
                  },
                };
              }
              return col;
            }),
              iconActionsColumn,
            ]}
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
              '& .MuiDataGrid-row:hover': { cursor: 'pointer' },
              '& .MuiDataGrid-row.Mui-selected': { backgroundColor: 'transparent' },
              '& .MuiDataGrid-cellCheckbox': { display: 'none' },
            }}
          />
          <Dialog
            open={applicationDialogOpen}
            onClose={() => setApplicationDialogOpen(false)}
            sx={{
              '& .MuiDialog-paper': {
                backgroundColor: 'background.paper',
                minWidth: '500px',
              },
            }}
          >
            <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
              Applicant for {selectedApp?.jobTitle}
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ backgroundColor: 'background.paper' }}>
              {selectedApp && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>ID:</strong> {selectedApp.applicationDetails.id}
                  </Typography>
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>Name:</strong> {selectedApp.applicationDetails.name}
                  </Typography>
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>Email:</strong> {selectedApp.applicationDetails.email}
                  </Typography>
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>Phone:</strong> {selectedApp.applicationDetails.phone}
                  </Typography>
                  <Typography sx={{ color: 'text.primary' }}>
                    <strong>Skills:</strong> {selectedApp.applicationDetails.skills.join(', ')}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <Divider />
            <DialogActions sx={{ backgroundColor: 'background.paper' }}>
              <Button
                onClick={() => setApplicationDialogOpen(false)}
                variant="contained"
                sx={{ backgroundColor: 'secondary.main', color: 'primary.contrastText' }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionProps={{ onExited: handleSnackbarExited }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgb(24, 161, 0)',
                px: 2,
                py: 1.5,
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <CheckCircleIcon sx={{ color: 'white' }} />
              <Box component="span" sx={{ color: 'white', fontWeight: 500 }}>
                Intern removed from current interns. Removing from interns table
              </Box>
            </Box>
          </Snackbar>
          <EvaluationDialogue
            open={openEvaluationDialog}
            onClose={handleCloseEvaluationDialog}
            onSubmit={handleEvaluationSubmit}
            internName={selectedInternName}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}