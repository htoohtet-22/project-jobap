import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

export default function DetailItem({
  icon,
  label,
  children,
}: DetailItemProps) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        minWidth: 0,
        alignItems: 'start',
      }}
    >
      <Box
        sx={{
          pt: 1.25,
          display: 'flex',
          color: 'text.secondary',
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            mb: 0.25,
          }}
        >
          {label}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            wordBreak: 'break-word',
          }}
        >
          {children}
        </Typography>
      </Box>
    </Stack>
  );
}