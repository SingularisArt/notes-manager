import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { Notifications } from "@mui/icons-material";

import Notification from "./Notification";

import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

interface TopbarProps {
  title: string;
}

const Topbar = ({ title }: TopbarProps) => {
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
          <Typography variant="h4">
            {title}
          </Typography>
          <div>
          <Notification />
          </div>
        </Toolbar>
      </AppBar>
  );
};

export default Topbar;
