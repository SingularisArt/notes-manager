import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteType } from "../../routes/config";
import { setActivePage } from "../../store/actions/sidebarActions";

import colorConfigs from "../../configs/colorConfigs";
import { SidebarData } from "../../utils/redux";

type Props = {
  item: RouteType;
};

const SidebarItem: React.FC<Props> = ({ item }) => {
  const { sidebarData, dispatch } = SidebarData();
  const activePage = sidebarData.activePage;

  const handleItemClick = () => {
    dispatch(setActivePage(item.state));
  };

  return (
    item.sidebarProps && item.path ? (
      <ListItemButton
        component={Link}
        to={item.path}
        onClick={handleItemClick}
        sx={{
          color: colorConfigs.sidebar.color,
          "&:hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg,
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
