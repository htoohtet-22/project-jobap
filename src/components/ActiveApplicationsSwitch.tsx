import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

interface ActiveApplicationsSwitchProps {
  checked: boolean,
  onChange: (checked: boolean) => void,
}

export default function ActiveApplicationsSwitch({ 
  checked, 
  onChange, 
}: ActiveApplicationsSwitchProps) {
  return (
    <Stack 
      direction="row"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ color:"text.secondary" }}>All</Typography>
      <Switch 
        color='primary'
        checked={checked} 
        onChange={(event) => onChange(event.target.checked)}
      />
      <Typography sx={{ color:"text.secondary" }}>Active</Typography>
    </Stack>
  )
}