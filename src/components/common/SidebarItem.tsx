import { ListItemButton, ListItemIcon } from "@mui/material";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../redux/store";
import { RouteType } from "../../routes/config";

import colorConfigs from "../../configs/colorConfigs";

type Props = {
  item: RouteType;
};

const SidebarItem = ({ item }: Props) => {
  const activePage = useSelector((state: RootState) => state.sidebarActivePage.activePage);

  return (
    item.sidebarProps && item.path ? (
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          color: colorConfigs.sidebar.color,
          "&: hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg
          },
          backgroundColor: activePage === item.state ? colorConfigs.sidebar.activeBg : "unset",
          paddingY: "12px",
          paddingX: "24px",
        }}
      >
        {
          item.sidebarProps.icon ? (
            <ListItemIcon sx={{ color: colorConfigs.sidebar.color }}>
              {item.sidebarProps.icon && item.sidebarProps.icon}
            </ListItemIcon>
          ) : null
        }
        {item.sidebarProps.displayText}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;
