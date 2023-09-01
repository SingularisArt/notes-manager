import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { toggleSidebar } from "../../store/actions/sidebarActions";
import Notification from "./Notification";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import { SidebarData } from "../../utils/redux";

interface TopbarProps {
  title: string;
}

const Topbar: React.FC<TopbarProps> = ({ title }) => {
  const { sidebarData, dispatch } = SidebarData();
  const mainContentWidth = sidebarData.isSidebarEnabled ? `calc(100% - ${sizeConfigs.sidebar.width})` : "100%";

  return (
    <AppBar
      position="fixed"
      sx={{
        width: mainContentWidth,
        transition: "width 0.3s",
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="toggle-sidebar"
              onClick={() => dispatch(toggleSidebar())}
              sx={{
                marginRight: "8px",
                marginLeft: "-10px",
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Typography variant="h4">{title}</Typography>
        </div>
        <div>
          <Notification />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
