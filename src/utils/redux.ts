import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store/store";

export const SidebarData = () => {
  const sidebarData = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  return { sidebarData, dispatch };
};
