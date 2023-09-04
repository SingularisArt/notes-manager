import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

import { SidebarData } from "utils/redux";

import sizeConfigs from "configs/sizeConfigs";
import Sidebar from "components/common/Sidebar/Sidebar";

import "./MainLayout.css";

const MainLayout = () => {
  const { sidebarData } = SidebarData();
  const isSidebarEnabled = sidebarData.isSidebarEnabled;

  const mainContentWidth = isSidebarEnabled ? `calc(100% - ${sizeConfigs.sidebar.width})` : "100%";
  const sidebarWidth = isSidebarEnabled ? sizeConfigs.sidebar.width : "0px";

  return (
    <div className="main-layout">
      <Box className="main-layout-container">
        <Box className="sidebar" sx={{ width: sidebarWidth }}>
          <Sidebar />
        </Box>
        <Box className="main-content" sx={{ width: mainContentWidth }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default MainLayout;
