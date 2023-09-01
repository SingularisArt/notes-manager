import React from "react";
import { Stack, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";

import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

import { generalRoutes, courseRoutes } from "../../routes/appRoutes";

import SidebarItem from "./SidebarItem";

import HomePage from "../../pages/home/HomePage";
import { toggleSidebar } from "../../store/actions/sidebarActions";
import { SidebarData } from "../../utils/redux";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { sidebarData, dispatch } = SidebarData();
  const isSidebarEnabled = sidebarData.isSidebarEnabled;

  const menuItemStyles = {
    button: ({ active }: { active: boolean }) => {
      return {
        color: colorConfigs.sidebar.color,
        backgroundColor: active ? colorConfigs.sidebar.activeBg : colorConfigs.sidebar.bg,
        "&:hover": {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        },
      };
    },
  };

  const sidebarWidth = isSidebarEnabled ? sizeConfigs.sidebar.width : "0px";

  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        width: sidebarWidth,
      }}
    >
      <ProSidebar
        collapsed={collapsed}
        backgroundColor={colorConfigs.sidebar.bg}
        collapsed={!isSidebarEnabled}
        onBreakPoint={() => {
          if (isSidebarEnabled) dispatch(toggleSidebar())
        }}
        breakPoint="md"
        collapsedWidth="0px"
        transitionDuration={300}
        rootStyles={{
          height: "100vh !important",
        }}
      >
        <div style={{ marginTop: "10px", whiteSpace: "nowrap" }}>
          <Link to="/" element={<HomePage />} style={{ textDecoration: "none" }}>
            <Toolbar>
              <Stack
                sx={{ color: colorConfigs.sidebar.color }}
                direction="row"
                justifyContent="center"
              >
                <Typography variant="h5">
                  LaTNote Manager
                  <hr />
                </Typography>
              </Stack>
            </Toolbar>
          </Link>

          <div style={{ flex: 1, marginBottom: "32px", marginTop: "15px" }}>
            <div style={{ padding: "0 24px", marginBottom: "8px" }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: 0.7,
                  letterSpacing: "0.5px",
                  color: colorConfigs.sidebar.headingBg,
                }}
              >
                General
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              {generalRoutes.map((route, index) => (
                <SidebarItem item={route} key={index} />
              ))}
            </Menu>

            <div style={{ padding: "0 24px", marginBottom: "8px", marginTop: "32px" }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: 0.7,
                  letterSpacing: "0.5px",
                  color: colorConfigs.sidebar.headingBg,
                }}
              >
                Courses
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              {courseRoutes.map((route, index) => (
                <SidebarItem item={route} key={index} />
              ))}
            </Menu>
          </div>
        </div>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
