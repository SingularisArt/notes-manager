import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActivePage } from "store/actions/sidebarActions";

type Props = {
  state?: string;
  children: ReactNode;
};

const PageWrapper: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(setActivePage(props.state));
    }
  }, [dispatch, props]);

  return <>{props.children}</>;
};

export default PageWrapper;
