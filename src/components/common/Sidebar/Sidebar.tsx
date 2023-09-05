import React from 'react';
import Typography from '@mui/material/Typography';
import colorConfigs from 'configs/colorConfigs';
import sizeConfigs from 'configs/sizeConfigs';
import SidebarItem from 'components/common/SidebarItem/SidebarItem';
import HomePage from 'pages/home/HomePage';
import { Stack, Toolbar } from '@mui/material';
import { Sidebar as ProSidebar, Menu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { generalRoutes, courseRoutes } from 'routes/appRoutes';
import { SidebarData } from 'utils/redux';
import { toggleSidebar } from 'store/actions/sidebarActions';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { sidebarData, dispatch } = SidebarData();
  const isSidebarEnabled = sidebarData.isSidebarEnabled;

  const menuItemStyles = {
    button: ({ active }: { active: boolean }) => {
      return {
        color: colorConfigs.sidebar.color,
        backgroundColor: active
          ? colorConfigs.sidebar.activeBg
          : colorConfigs.sidebar.bg,
        '&:hover': {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        },
      };
    },
  };

  const sidebarWidth = isSidebarEnabled ? sizeConfigs.sidebar.width : '0px';

  return (
    <div className="sidebar" style={{ width: sidebarWidth }}>
      <ProSidebar
        backgroundColor={colorConfigs.sidebar.bg}
        collapsed={!isSidebarEnabled}
        onBreakPoint={() => {
          if (isSidebarEnabled) dispatch(toggleSidebar());
        }}
        breakPoint="md"
        collapsedWidth="0px"
        transitionDuration={300}
        rootStyles={{
          height: '100vh !important',
        }}
      >
        <div className="sidebar-header">
          <Link className="sidebar-header-link" to="/" element={<HomePage />}>
            <Toolbar>
              <Stack
                className="sidebar-title"
                direction="row"
                justifyContent="center"
              >
                <Typography variant="h5">
                  Note Manager
                  <hr />
                </Typography>
              </Stack>
            </Toolbar>
          </Link>

          <div className="sidebar-content">
            <div className="sidebar-general-container">
              <Typography
                className="sidebar-general"
                variant="body2"
                fontWeight={600}
              >
                General
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              {generalRoutes.map((route, index) => (
                <SidebarItem item={route} key={index} />
              ))}
            </Menu>

            <div className="sidebar-courses-container">
              <Typography
                className="sidebar-courses"
                variant="body2"
                fontWeight={600}
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
