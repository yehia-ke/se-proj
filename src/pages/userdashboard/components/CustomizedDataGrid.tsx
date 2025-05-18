'use client';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { columns, rows } from '../internals/data/gridDataCurated';

interface Job {
  id: number;
  companyName: string;
  industry: string;
  feedback: string;
}

export default function CustomizedDataGrid() {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [rowsState, setRowsState] = React.useState<Job[]>(rows);
  const rowHeight = 60;
  const headerHeight = 52;
  const totalHeight = headerHeight + rowsState.length * rowHeight;

  return (
    <Box sx={{ width: '100%' }}>
      <Accordion
        expanded={isExpanded}
        onChange={() => setIsExpanded(!isExpanded)}
        sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: 'background.paper',
            '&:hover': { backgroundColor: 'action.hover' },
          }}
        >
          <Typography variant="h6">Curated Companies</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}>
          <Grid size={{ xs: 12, lg: 9 }}>
            <DataGrid
              rows={rowsState}
              columns={columns}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10, 25, 50]}
              disableColumnResize
              rowHeight={rowHeight}
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
                '& .MuiDataGrid-root': {
                  border: 'none',
                  height: `${totalHeight}px`,
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'background.default',
                  borderBottom: '2px solid',
                  borderColor: 'divider',
                },
                '& .MuiDataGrid-virtualScroller': {
                  overflow: 'visible !important',
                },
              }}
              disableRowSelectionOnClick
              disableVirtualization
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}