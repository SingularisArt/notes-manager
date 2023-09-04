import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteType } from "routes/config";
import { setActivePage } from "store/actions/sidebarActions";
import { SidebarData } from "utils/redux";
import "./SidebarItem.css";

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
        className={`sidebar-button ${activePage == item.state ? 'active' : ''}`}
      >
        {
          item.sidebarProps.icon ? (
            <ListItemIcon className="sidebar-icon">
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
