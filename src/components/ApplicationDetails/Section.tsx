import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({
  title,
  children,
}: SectionProps) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: { xs: 2, sm: 3 } }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">
          {title}
        </Typography>
      </Box>

      {children}
    </Paper>
  );
}