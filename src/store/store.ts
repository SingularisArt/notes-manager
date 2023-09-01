import { createStore, combineReducers } from "redux";

import courseReducer from "./reducers/courseReducer";
import { CourseState } from "./types/CourseType";

import sidebarReducer from "./reducers/sidebarReducer";
import { SidebarState } from "./types/SidebarType";

export interface RootState {
  course: CourseState;
  sidebar: SidebarState;
}

const rootReducer = combineReducers({
  course: courseReducer,
  sidebar: sidebarReducer,
});

const store = createStore(rootReducer);

export default store;
