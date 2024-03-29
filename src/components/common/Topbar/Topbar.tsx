import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Search from 'components/common/Search/Search';
import sizeConfigs from 'configs/sizeConfigs';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { toggleSidebar } from 'store/actions/sidebarActions';
import { SidebarData } from 'utils/redux';
import './Topbar.css';

type TopbarProps = {
  title: string;
};

const Topbar: React.FC<TopbarProps> = ({ title }) => {
  const { sidebarData, dispatch } = SidebarData();
  const mainContentWidth = sidebarData.isSidebarEnabled
    ? `calc(100% - ${sizeConfigs.sidebar.width})`
    : '100%';

  return (
    <div className="container">
      <AppBar
        position="fixed"
        className="topbar"
        sx={{ width: mainContentWidth }}
      >
        <Toolbar className="toolbar">
          <div className="toolbar-right">
            <div>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => dispatch(toggleSidebar())}
                className="toggle-sidebar"
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Typography variant="h4">{title}</Typography>
          </div>
          <div>
            <Search />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Topbar;
