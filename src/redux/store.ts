import { configureStore } from "@reduxjs/toolkit";
import sidebarActivePageSlice from "./sidebarActivePage";
import isSidebarEnabledSlice from "./isSidebarEnabled";

export const store = configureStore({
  reducer: {
    sidebarActivePage: sidebarActivePageSlice.reducer,
    isSidebarEnabled: isSidebarEnabledSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
