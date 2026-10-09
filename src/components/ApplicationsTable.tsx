import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StatusChip from "./StatusChip";
import type { JobApplication } from "../lib/types";

export default function ApplicationsTable({ rows }: { rows: JobApplication[] }) {
  const navigate = useNavigate();

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <TableContainer 
        sx={{ 
          width: '100%',
          height: '100%',
          overscrollBehavior: 'none',
          scrollbarWidth: 0,
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Applied</TableCell>
              <TableCell>Follow-up</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((app) => (
              <TableRow 
                key={app.id} 
                hover
                sx={{ 
                  cursor: 'pointer',
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
                onClick={() => navigate(`/applications/${app.id}`)}
              >
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}