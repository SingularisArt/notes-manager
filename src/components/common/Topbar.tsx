import { useSelector, useDispatch } from "react-redux";
import { AppBar, IconButton, Toolbar, Typography, styled } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { isSidebarEnabledActions } from "../../redux/isSidebarEnabled";
import { RootState } from "../../redux/store";
import Notification from "./Notification";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

interface TopbarProps {
  title: string;
}

const Topbar = ({ title }: TopbarProps) => {
  const dispatch = useDispatch();

  const isSidebarEnabled = useSelector((state: RootState) => state.isSidebarEnabled.enabled);
  const mainContentWidth = isSidebarEnabled ? `calc(100% - ${sizeConfigs.sidebar.width})` : "100%";

  const handleSidebarToggle = () => {
    dispatch(isSidebarEnabledActions.toggleSidebar());
  };

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
              onClick={handleSidebarToggle}
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
