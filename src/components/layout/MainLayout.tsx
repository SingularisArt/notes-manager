import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";

const MainLayout = () => {
  const isSidebarEnabled = useSelector((state: RootState) => state.isSidebarEnabled.enabled);

  const mainContentWidth = isSidebarEnabled ? `calc(100% - ${sizeConfigs.sidebar.width})` : "100%";
  const sidebarWidth = isSidebarEnabled ? sizeConfigs.sidebar.width : "0px";

  return (
    <div style={{ backgroundColor: colorConfigs.mainBg }}>
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            transition: "width 0.3s", // Apply transition to the sidebar width
          }}
        >
          <Sidebar />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            width: mainContentWidth,
            minHeight: "100vh",
            transition: "width 0.3s", // Apply transition to the main content width
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default MainLayout;
