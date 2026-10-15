import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useApplicationsViewToggle } from "../context/ApplicationsViewToggleContext";

export default function ApplicationsViewToggleButtonGroup() {
  const { currentView, handleViewChange } = useApplicationsViewToggle();
  return (
    <ToggleButtonGroup
      color="primary"
      value={currentView}
      exclusive
      onChange={handleViewChange}
    >
      <ToggleButton value="table">
        <TableChartOutlinedIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="cards">
        <MenuOutlinedIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}