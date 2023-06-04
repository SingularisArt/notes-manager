import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sidebarActivePageActions } from "../../redux/sidebarActivePage";

type Props = {
  state?: string;
  children: ReactNode;
};

const PageWrapper = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(sidebarActivePageActions.setActivePage(props.state));
    }
  }, [dispatch, props]);

  return <>{props.children}</>;
};

export default PageWrapper;
