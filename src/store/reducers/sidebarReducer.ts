import { SidebarActionType, SidebarState } from "../types/SidebarType";

const initialState: SidebarState = {
  isSidebarEnabled: true,
  activePage: "",
};

const sidebarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SidebarActionType.TOGGLE_SIDEBAR:
      return { ...state, isSidebarEnabled: !state.isSidebarEnabled };
    case SidebarActionType.SET_ACTIVE_PAGE:
      return { ...state, activePage: action.payload };
    default:
      return state;
  }
};

export default sidebarReducer;
