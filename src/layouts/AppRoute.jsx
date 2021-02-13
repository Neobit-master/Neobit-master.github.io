import useAuth from "@Hooks/useAuth";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const AppRoute = ({
  component: Component,
  layout: Layout,
  private: Private,
  ...rest
}) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Private) {
          return auth.user ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to="login" />
          );
        }
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default AppRoute;
