import { useSelector } from "react-redux";
import { Stack, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";

import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

import { generalRoutes, courseRoutes } from "../../routes/appRoutes";

import SidebarItem from "./SidebarItem";

import HomePage from "../../pages/home/HomePage";
// import EmailPage from "../../pages/email/EmailPage";
// import CalendarPage from "../../pages/calendar/CalendarPage";
// import CoursePage from "../../pages/course/CoursePage";

// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

// import { IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const isSidebarEnabled = useSelector((state: RootState) => state.isSidebarEnabled.enabled);

  const menuItemStyles = {
    button: ({ level, active, disabled }) => {
      return {
        color: colorConfigs.sidebar.color,
        backgroundColor: active ? colorConfigs.sidebar.activeBg : colorConfigs.sidebar.bg,
        "&:hover": {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        }
      };
    },
  }

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
        backgroundColor={colorConfigs.sidebar.bg}
        collapsed={!isSidebarEnabled}
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
                  color: colorConfigs.sidebar.headingBg
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
                  color: colorConfigs.sidebar.headingBg
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
