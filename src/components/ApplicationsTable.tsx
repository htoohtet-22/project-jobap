import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StatusChip from "./StatusChip";
import type { JobApplication } from "../lib/types";

interface Props {
  rows: JobApplication[],
  openEdit: (app: JobApplication) => void,
  setToDelete: (app: JobApplication) => void,
}

export default function ApplicationsTable({ rows, openEdit, setToDelete }: Props) {
  return (
    <Paper variant="outlined" sx={{ 
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}>
      <TableContainer sx={{
        width: '100%',
        overflowX: 'auto', 
      }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Applied</TableCell>
              <TableCell>Follow-up</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((app) => (
              <TableRow key={app.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontWeight: 500 }}>
                  {app.jobLink ? (
                    <Link
                      href={app.jobLink}
                      target="_blank"
                      rel="noopener"
                      underline="hover"
                      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                    >
                      {app.title}
                      <OpenInNewIcon sx={{ fontSize: 14 }} />
                    </Link>
                  ) : (
                    app.company
                  )}
                </TableCell>
                <TableCell>{app.company}</TableCell>
                <TableCell>
                  <StatusChip status={app.status} />
                </TableCell>
                <TableCell>
                  {app.dateApplied ? new Date(app.dateApplied).toLocaleDateString() : '—'}
                </TableCell>
                <TableCell>
                  {app.followUpDate ? new Date(app.followUpDate).toLocaleDateString() : '—'}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <IconButton onClick={() => openEdit(app)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => setToDelete(app)} sx={{ color: 'error.main' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}