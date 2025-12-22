import { ComponentType, ReactNode } from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface AppRouteProps extends Omit<RouteProps, 'component' | 'render'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  layout: ComponentType<{ children: ReactNode }>;
}

const AppRoute = ({ component: Component, layout: Layout, ...rest }: AppRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default AppRoute;