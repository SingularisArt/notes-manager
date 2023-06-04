import { useDispatch } from "react-redux";
import { AppBar, IconButton, Toolbar, Typography, styled } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import Notification from "./Notification";

import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

import { toggleSidebar } from "../../redux/features/appStateSlice";

interface TopbarProps {
  title: string;
}

const Topbar = ({ title }: TopbarProps) => {
  const dispatch = useDispatch();

  const StyledIconButton = styled(IconButton)`
    border-radius: 50%;
    padding: 8px;
    background-color: ${colorConfigs.topbar.iconBg};
    color: ${colorConfigs.topbar.iconColor};
    margin-right: 8px;
    margin-left: -10px;
  `;

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar()); // Dispatch the toggleSidebar action
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <StyledIconButton
              edge="end"
              color="inherit"
              aria-label="toggle-sidebar"
              onClick={handleSidebarToggle} // Call the handleSidebarToggle function on button click
            >
              <MenuIcon />
            </StyledIconButton>
          </div>
          <Typography variant="h4">
            {title}
          </Typography>
        </div>
        <div>
          <Notification />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
