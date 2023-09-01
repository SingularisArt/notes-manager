import { createStore, combineReducers } from "redux";
import sidebarReducer from "./reducers/sidebarReducer";
import { SidebarState } from "./types/SidebarType";

export interface RootState {
  sidebar: SidebarState;
}

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
});

const store = createStore(rootReducer);

export default store;
