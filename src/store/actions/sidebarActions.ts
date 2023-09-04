import { SidebarActionType } from "store/types/SidebarType";

export const toggleSidebar = () => {
  return {
    type: SidebarActionType.TOGGLE_SIDEBAR,
  };
};

export const setActivePage = (activePage: string) => {
  return {
    type: SidebarActionType.SET_ACTIVE_PAGE,
    payload: activePage,
  };
};
