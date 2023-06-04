import { ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import { generalRoutes, courseRoutes } from "./appRoutes";
import { RouteType } from "./config";

const generateRoute = (routes: RouteType[]): ReactNode => {
  return routes.map((route, index) => (
    route.index ? (
      <Route
        index
        path={route.path}
        element={<PageWrapper state={route.state}>
          {route.element}
        </PageWrapper>}
        key={index}
      />
    ) : (
      <Route
        path={route.path}
        element={
          <PageWrapper state={route.child ? undefined : route.state}>
            {route.element}
          </PageWrapper>
        }
        key={index}
      >
        {route.child && (
          generateRoute(route.child)
        )}
      </Route>
    )
  ));
};

const general = generateRoute(generalRoutes);
const course = generateRoute(courseRoutes);

export { general, course }
