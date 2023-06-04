import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const sidebarActivePageSlice = createSlice({
  name: "activePage",
  initialState: { activePage: "" },
  reducers: {
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
  },
});

export const sidebarActivePageActions = sidebarActivePageSlice.actions;
export default sidebarActivePageSlice;
