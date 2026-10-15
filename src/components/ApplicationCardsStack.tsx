import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StatusChip from "./StatusChip";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import type { JobApplication } from "../lib/types";
import { formatDate } from "../lib/utlis";

export default function ApplicationCardsStack({ applications }: { applications: JobApplication[]}) {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 3 }}
      sx={{
        width: '100%',
        overflow: 'auto',
        overscrollBehavior: 'none',
      }}
    >
      {applications.map((application, index) => (
        <Grid size={{ xs: 12, md: 6 }} key={index}>
        {/* <Grid size={12} key={index}> */}
          <Paper
            variant="outlined"
            sx={{ p: 2 }}
          >
            <Stack spacing={0.5} sx={{ marginBottom: 1 }}>
              <Stack spacing={0.5}>
                <StatusChip status={application.status} />
                {application.jobLink ? (
                    <Link
                      href={application.jobLink}
                      target="_blank"
                      rel="noopener"
                      underline="hover"
                      sx={{ 
                        width: 'fit-content',
                        maxWidth: '100%',
                        fontSize: 18,
                        fontWeight: 500,
                        gap: 1,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{ alignItems: 'center' }}
                      >
                        {`${application.title} `}
                        <OpenInNewIcon sx={{ mb: 0.25, fontSize: 20 }} />
                      </Box>
                    </Link>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 500 }}
                    >
                      {application.company}
                    </Typography>
                  )}
              </Stack>
              <Typography 
                variant="caption"
                sx={{ fontWeight: 300 }}
              >
                {application.company}
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx= {{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flex: 1,
                  gap: 1,
                  alignItems: 'center',
                  color: 'text.secondary',
                }}
              >
                <CalendarTodayOutlinedIcon fontSize="small"/>
                <Typography 
                  variant="caption" 
                  sx={{ fontWeight: 300 }}
                >
                  {formatDate(application.dateApplied)}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'end',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/applications/${application.id}`)}
                >
                  View
                </Button>
              </Box>

            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}