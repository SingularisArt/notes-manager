export interface SidebarState {
  isSidebarEnabled: boolean;
  activePage: string;
}

export enum SidebarActionType {
  TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
  SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE",
}
