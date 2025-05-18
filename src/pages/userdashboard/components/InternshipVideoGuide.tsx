import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';

export default function InternshipVideoGuide() {
  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ width: '100%', pl: 0, pb: 2 }}>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="video-guide-content"
          id="video-guide-header"
          sx={{ '&:hover': { backgroundColor: 'action.hover' } ,backgroundColor: 'background.paper' }}
        >
          <Typography component="h2" variant="h6">
            View Internship Guide Video
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            {/* Embedding YouTube video using iframe with dynamic height */}
            <Box sx={{ width: '100%', position: 'relative', paddingBottom: '56.25%', height: 0, alignSelf: 'center' }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/PgvGwn6o734"
                title="Internship Guide Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0 }}
              ></iframe>
            </Box>

            <Divider sx={{ width: '100%', my: 3 }}>
              <Typography variant="body2" color="textSecondary">
                Example Path to Completion
              </Typography>
            </Divider>

            <Box display="flex" flexDirection="column" gap={3} alignItems="flex-start" width="100%">
              <Box display="flex" alignItems="center" gap={2}>
                <WorkIcon color="primary" />
                <Typography variant="body1">Step 1: Get an internship related to your major</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <SchoolIcon color="secondary" />
                <Typography variant="body1">Step 2: Get faculty approval or course enrollment</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <TimelineIcon color="success" />
                <Typography variant="body1">Step 3: Track and submit internship hours and report</Typography>
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
