import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const isSidebarEnabledSlice = createSlice({
  name: "isSidebarEnabled",
  initialState: { enabled: true },
  reducers: {
    toggleSidebar: (state) => {
      state.enabled = !state.enabled;
    }
  }
});

export const isSidebarEnabledActions = isSidebarEnabledSlice.actions;
export default isSidebarEnabledSlice;
