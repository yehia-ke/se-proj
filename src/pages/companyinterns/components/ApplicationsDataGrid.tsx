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
import { Divider, keyframes } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { appColumns } from '../internals/data/gridData';
import Snackbar from '@mui/material/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
  onRemove?: (id: number) => void; // Add this
}

export default function ApplicationsDataGrid({ rows, onRemove }: Props) {
  const [selectedApp, setSelectedApplication] = React.useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [applicationDialogOpen, setApplicationDialogOpen] = React.useState(false);
  const [currentInterns, setCurrentInterns] = React.useState<Set<number>>(new Set());
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [internToRemove, setInternToRemove] = React.useState<number | null>(null);
  const [removalTimeout, setRemovalTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const [localRows, setLocalRows] = React.useState<Application[]>(rows);

  const [applicationStatuses, setApplicationStatuses] = React.useState<{
    [key: number]: 'accepted' | 'rejected' | 'finalized'
  }>({});

  // Filter rows based on search query
  const filteredRows = React.useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return localRows.filter((row) =>
      row.jobTitle.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery, localRows]);

  const handleCurrentInternToggle = () => {
    if (selectedApp) {
      setCurrentInterns(prev => {
        const newSet = new Set(prev);
        if (newSet.has(selectedApp.id)) {
          newSet.delete(selectedApp.id);
        } else {
          newSet.add(selectedApp.id);
        }
        return newSet;
      });
    }
  };

  const handleInternshipComplete = () => {
    if (selectedApp) {
      setOpenSnackbar(true);
      setInternToRemove(selectedApp.id);
      if (!onRemove) {
        const timeout = setTimeout(() => {
          setLocalRows(prev => prev.filter(row => row.id !== selectedApp.id));
          setApplicationDialogOpen(false); // Add this line for immediate closure
        }, 2000);
        setRemovalTimeout(timeout);
      }
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleUndo = () => {
    setOpenSnackbar(false);
    if (removalTimeout) clearTimeout(removalTimeout);
    setInternToRemove(null);
  };


  const handleSnackbarExited = () => {
    if (internToRemove !== null) {
      if (onRemove) {
        onRemove(internToRemove);
      } else {
        setLocalRows(prev => prev.filter(row => row.id !== internToRemove));
      }
      setApplicationDialogOpen(false); // Add this line
      setInternToRemove(null);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (id: number, status: 'accepted' | 'rejected' | 'finalized' | null) => {
    setApplicationStatuses(prev => {
      if (status === null) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      if (status !== 'accepted') {
        if (selectedApp) {
          setCurrentInterns(prev => {
            const newSet = new Set(prev);
            if (newSet.has(selectedApp.id)) {
              newSet.delete(selectedApp.id);
            } else {
              newSet.add(selectedApp.id);
            }
            return newSet;
          });
        }
      }
      return { ...prev, [id]: status };
    });
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedApplication(params.row as Application);
    setApplicationDialogOpen(true);
  };

  // Define keyframes for bounce effect
  const bounce = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  `;

  const renderActions = (params: any) => {
    const { onStatusChange, applicationStatuses, ...gridParams } = params;
    const currentStatus = applicationStatuses[gridParams.row.id];

    const handleButtonClick = (
      event: React.MouseEvent,
      buttonStatus: 'accepted' | 'rejected' | 'finalized'
    ) => {
      event.stopPropagation();
      if (currentStatus === buttonStatus) {
        onStatusChange(gridParams.row.id, null);
      } else {
        onStatusChange(gridParams.row.id, buttonStatus);
      }
    };

    const buttons = [
      {
        status: 'accepted',
        label: 'Accept',
        color: 'success',
      },
      {
        status: 'rejected',
        label: 'Reject',
        color: 'error',
      },
      {
        status: 'finalized',
        label: 'Finalize',
        color: 'info',
      },
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
              onClick={(event) => handleButtonClick(event, status)}
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
                {isActive ? (status === 'finalized' ? 'Finalized' : `${label}ed`) : label}
              </span>
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="in-progress-internships-content"
        id="in-progress-internships-header"
        sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
      >
        <Typography component="h2" variant="h6">All Applications</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: '100%', p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              label="Search by Job Title"
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
          </Box>
          <DataGrid
            rows={filteredRows}
            columns={appColumns.map(col => {
              if (col.field === 'actions') {
                return {
                  ...col,
                  renderCell: (params: GridCellParams) =>
                    renderActions({ ...params, onStatusChange: handleStatusChange, applicationStatuses })
                };
              }
              return col;
            })}
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
            <DialogActions sx={{ backgroundColor: 'background.paper', position: 'relative' }}>
              {applicationStatuses[selectedApp?.id || 0] === 'accepted' && (
                <Button
                  onClick={handleCurrentInternToggle}
                  variant="contained"
                  sx={{
                    color: currentInterns.has(selectedApp?.id || -1) ? 'success.main' : 'primary.main',
                    borderColor: currentInterns.has(selectedApp?.id || -1) ? 'success.main' : 'primary.main',
                    mr: 'auto',
                  }}
                >
                  {currentInterns.has(selectedApp?.id || -1) ? '✓ Current Intern' : 'Mark as Current Intern'}
                </Button>
              )}

              {applicationStatuses[selectedApp?.id || 0] === 'accepted' &&
                currentInterns.has(selectedApp?.id || -1) && (
                  <Button
                    onClick={handleInternshipComplete}
                    variant="outlined"
                    color="success"
                    sx={{
                      borderColor: 'success.main',
                      color: 'success.main',
                      '&:hover': {
                        backgroundColor: 'success.light'
                      }
                    }}
                  >
                    Internship Complete
                  </Button>
                )}

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
                Applicant marked as "Intern Complete". Removing from applicants table
              </Box>
              <Button
                onClick={handleUndo}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
                variant="outlined"
                size="small"
              >
                Undo
              </Button>
            </Box>
          </Snackbar>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}