import Chip from "@mui/material/Chip";
import { STATUS_LABELS, type ApplicationStatus } from "../lib/types";

const COLORS: Record<
  ApplicationStatus,
  { bg: string, fg: string }
> = {
  APPLIED: { bg: '#e8f0fe', fg: '#1a73e8'},
  VIEWED: { bg: '#e8f0fe', fg: '#1a73e8'},
  CONTACTED: { bg: '#fef7e0', fg: '#b06000'},
  INTERVIEWING: { bg: '#fef7e0', fg: '#b06000'},
  OFFERED: { bg: '#e6f4ea', fg: '#188038'},
  ACCEPTED: { bg: '#e6f4ea', fg: '#188038'},
  REJECTED: { bg: '#fce8e6', fg: '#c5221f'},
  WITHDRAWN: { bg: '#e8eaed', fg: '#3c4043'},
  EXPIRED: { bg: '#f1f3f4', fg: '#5f6368'},
  UNRESPONSIVE: { bg: '#f1f3f4', fg: '#5f6368'},
}

export default function StatusChip({ status }: { status: ApplicationStatus }) {
  const c = COLORS[status];
  
  return (
    <Chip 
      label={STATUS_LABELS[status]}
      size="small"
      sx={{ backgroundColor: c.bg, color: c.fg }}
    />
  )
}