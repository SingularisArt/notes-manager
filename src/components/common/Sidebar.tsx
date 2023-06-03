import { useState } from 'react';
import { Drawer, List, Stack, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";

import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";

import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItemStyles = {
    button: ({ level, active, disabled }) => {
      return {
        color: colorConfigs.sidebar.color,
        backgroundColor: active ? colorConfigs.sidebar.activeBg : colorConfigs.sidebar.bg,
        '&:hover': {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        }
      };
    },
  }

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <ProSidebar
        backgroundColor={colorConfigs.sidebar.bg}
        collapsed={collapsed}
        breakPoint="md"
      >

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Toolbar>
            <Stack
              sx={{ width: "100%", color: colorConfigs.sidebar.color }}
              direction="row"
              justifyContent="center"
            >
              <Typography variant="h5">
                LaTNote Manager
              </Typography>
            </Stack>
          </Toolbar>

          <div style={{ flex: 1, marginBottom: '32px', marginTop: '15px' }}>
            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: collapsed ? 0 : 0.7,
                  letterSpacing: '0.5px',
                  color: colorConfigs.sidebar.headingBg
                }}
              >
                General
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem component={<Link to="/home" />}>Home</MenuItem>
              <MenuItem component={<Link to="/email" />}>Email</MenuItem>
              <MenuItem component={<Link to="/calendar" />}>Calendar</MenuItem>
            </Menu>

            <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px', color: colorConfigs.sidebar.headingBg }}
              >
                Extra
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem component={<Link to="/course" />}>Calculus 3 (MTH-253)</MenuItem>
              <MenuItem component={<Link to="/calendar" />}>Psychology 202 (PSY-202)</MenuItem>
              <MenuItem component={<Link to="/calendar" />}>Physics 123 (PHY-123)</MenuItem>
            </Menu>
          </div>
        </div>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
