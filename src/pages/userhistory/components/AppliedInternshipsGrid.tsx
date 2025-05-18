import * as React from 'react';
import {
  Box, Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Typography, Divider, TextField, Accordion, AccordionSummary,
  AccordionDetails, useTheme, Snackbar,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { getExtendedColumns } from '../internals/data/gridData';
import ShareIcon from '@mui/icons-material/Share';
import EmailIcon from '@mui/icons-material/Email';
import DialogueButtons from './DialogueButtons';
import { Email } from '@mui/icons-material';

interface AppliedJob {
  id: number;
  jobTitle: string;
  companyName: string;
  companySize: string;
  industry: string;
  duration: number;
  status: string;
  paid: boolean;
  expectedSalary?: number;
  skillsRequired: string[];
  jobDescription: string;
}

interface AppliedInternshipsGridProps {
  rows: AppliedJob[];
}

interface UnifiedActionParams extends GridRowParams {
  onViewComments: (job: AppliedJob) => void;
  isAppealed: boolean;
  isVisible?: (row: AppliedJob) => boolean;
}

function UnifiedActionButton({ row, onViewComments, isAppealed, isVisible }: UnifiedActionParams) {
  const theme = useTheme();
  // Log the entire theme object
  console.log("Current theme:", theme);

  // Log the current theme mode (light or dark)
  console.log("Current theme mode:", theme.palette.mode);
  const visible = isVisible ? isVisible(row) : true;

  if (!visible) return null;

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        onViewComments(row);
      }}
      variant="contained"
      size="small"
      sx={{
        padding: '6px 12px',
        justifyContent: 'flex-start',
        backgroundColor: isAppealed ? theme.palette.success.main : theme.palette.secondary.main,
        color: theme.palette.getContrastText(isAppealed ? theme.palette.success.main : theme.palette.secondary.main),
        '&:hover': {
          transform: isAppealed ? undefined : 'scale(1.05)',
        },
      }}
    >
      {isAppealed ? 'View Comments' : 'View Comments'}
    </Button>
  );
}

export default function AppliedInternshipsGrid({ rows }: AppliedInternshipsGridProps) {
  const theme = useTheme();
  const [selectedJob, setSelectedJob] = React.useState<AppliedJob | null>(null);
  const [viewingCommentsJob, setViewingCommentsJob] = React.useState<AppliedJob | null>(null);
  const [appealingJob, setAppealingJob] = React.useState<AppliedJob | null>(null);
  const [appealMessage, setAppealMessage] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expanded, setExpanded] = React.useState(true);
  const [jobComments, setJobComments] = React.useState<{ [key: number]: string[] }>({});
  const [appealedJobs, setAppealedJobs] = React.useState<{ [key: number]: boolean }>({});
  const [appealClicked, setAppealClicked] = React.useState<{ [key: number]: boolean }>({});
  const [openSnackbar, setOpenSnackbar] = React.useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const lastViewedJobRef = React.useRef<AppliedJob | null>(null);

  const handleViewComments = (job: AppliedJob) => {
    const dummy = [
      'SCAD Office: Your application was not a good fit for this role.',
      'Faculty Member: We are looking for candidates with strong React experience.',
      'SCAD Office: Please ensure your CV is updated before applying.',
      'Faculty Member: More experience in collaborative team projects is required.',
      'SCAD Office: Portfolio examples would have helped strengthen your application.',
    ];
    setJobComments((prev) => ({
      ...prev,
      [job.id]: prev[job.id] || dummy,
    }));
    setViewingCommentsJob(job);
  };

  const handleOpenAppeal = () => {
    lastViewedJobRef.current = viewingCommentsJob;
    setAppealingJob(viewingCommentsJob);
    setViewingCommentsJob(null);
  };

  const handleSubmitAppeal = () => {
    if (appealingJob) {
      setAppealedJobs((prev) => ({ ...prev, [appealingJob.id]: true }));
      setAppealClicked((prev) => ({ ...prev, [appealingJob.id]: true }));
      setAppealingJob(null);
    }
  };

  const handleCloseDialog = () => {
    setSelectedJob(null);
  };

  const handleShareClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setOpenSnackbar({ open: true, message: 'Link copied' });
  };

  const handleEmailClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.location.href = 'https://accounts.google.com/signin';
  };

  const filteredRows = rows.filter(
    (row) =>
      row.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = getExtendedColumns(() => { }).map((col) => {
    if (col.field === 'appeal') {
      return {
        ...col,
        renderCell: (params: GridRowParams) => (
          <UnifiedActionButton
            {...params}
            onViewComments={handleViewComments}
            isAppealed={!!appealedJobs[params.row.id]}
            isVisible={(row) => row.status === 'Rejected'}
          />
        ),
      };
    }
    return col;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', pb: 2 }}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="applied-internships-content"
          id="applied-internships-header"
          sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
        >
          <Typography component="h2" variant="h6">
            Applied Internships
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Search by Job Title or Company Name"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
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
          <DataGrid
            rows={filteredRows}
            columns={columns}
            rowHeight={60}
            pageSizeOptions={[10, 20]}
            initialState={{ pagination: { pageSize: 10 } }}
            onRowClick={(params) => setSelectedJob(params.row)}
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
              '& .MuiDataGrid-row.Mui-selected': {
                backgroundColor: 'transparent',
              },
            }}
          />
        </AccordionDetails>
      </Accordion>

      {/* Job Detail Dialog */}
      <Dialog
        open={!!selectedJob}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
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
                <strong>Duration:</strong> {selectedJob.duration} months
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
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    backgroundColor:
                      selectedJob.status === 'Accepted' ? theme.palette.success.main :
                        selectedJob.status === 'Rejected' ? theme.palette.error.main :
                          theme.palette.warning.main,
                  }}
                >
                  {selectedJob.status}
                </Box>
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Stipend:</strong> {selectedJob.paid ? 'Paid' : 'Unpaid'}
              </Typography>
              {selectedJob.paid && (
                <Typography sx={{ color: 'text.primary' }}>
                  <strong>Expected Salary:</strong> ${selectedJob.expectedSalary}
                </Typography>
              )}
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Skills Required:</strong> {selectedJob.skillsRequired.join(', ')}
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                <strong>Description:</strong> {selectedJob.jobDescription}
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
            <IconButton>
              <ShareIcon
                onClick={handleShareClick}
                aria-label="share"
              />
            </IconButton>
            <IconButton>
              <EmailIcon
                onClick={handleShareClick}
                aria-label="share"
              />
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

            {/* Comments Dialog */}
      <Dialog
        open={!!viewingCommentsJob}
        onClose={() => setViewingCommentsJob(null)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'background.paper',
            minWidth: '600px',
            height: '80vh',
          },
        }}
      >
        {viewingCommentsJob && (
          <>
            <DialogTitle sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}>
              Rejection Comments
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ backgroundColor: 'background.paper', overflowY: 'auto', maxHeight: '70vh' }}>
              {jobComments[viewingCommentsJob.id]?.map((comment, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: '0px 2px 5px rgba(200, 200, 200, 0.4)',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary',
                    }}
                  >
                    Comment {index + 1}:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'text.primary',
                    }}
                  >
                    {comment}
                  </Typography>
                </Box>
              ))}
            </DialogContent>
            <DialogActions sx={{ backgroundColor: 'background.paper' }}>
              {!appealedJobs[viewingCommentsJob.id] ? (
                <Button
                  onClick={handleOpenAppeal}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.getContrastText(theme.palette.secondary.main),

                  }}
                >
                  Appeal
                </Button>
              ) : (
                <Button
                  sx={{
                    color: 'success.main',
                    backgroundColor: 'transparent',
                    '&:hover': { backgroundColor: 'transparent' },
                    '&:focus': { backgroundColor: 'transparent' },
                  }}
                >
                  Appealed
                </Button>
              )}
              <Button onClick={() => setViewingCommentsJob(null)}
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.getContrastText(theme.palette.secondary.main),

                }}
              >Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Appeal Dialog */}
      <Dialog
        open={!!appealingJob}
        onClose={() => setAppealingJob(null)}
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
          Submit Your Appeal
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
            value={appealMessage}
            onChange={(e) => setAppealMessage(e.target.value)}
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
            Provide your reasons or any additional information for your appeal.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'background.paper' }}>
          <Button
            onClick={() => {
              setAppealingJob(null);
              if (lastViewedJobRef.current) {
                setViewingCommentsJob(lastViewedJobRef.current);
              }
            }}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.getContrastText(theme.palette.secondary.main),

            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (appealingJob) {
                setAppealedJobs((prev) => ({ ...prev, [appealingJob.id]: true }));
                setAppealClicked((prev) => ({ ...prev, [appealingJob.id]: true }));
              }
              handleSubmitAppeal();
              if (lastViewedJobRef.current) {
                setViewingCommentsJob(lastViewedJobRef.current);
              }
            }}
            color="primary"
            disabled={!appealMessage.trim()}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.getContrastText(theme.palette.secondary.main),

            }}
          >
            Submit Appeal
          </Button>
        </DialogActions>
      </Dialog>

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
