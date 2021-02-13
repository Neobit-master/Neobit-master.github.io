import React from "react";
import { Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

//Layouts
import LayoutDS from "@Layouts/LayoutDS";
import LayoutWS from "@Layouts/LayoutWS";
import AppRoute from "@Layouts/AppRoute";

// Containers
import Home from "@Containers/Home";
import Astheroids from "@Containers/Astheroids";
import HomeDS from "@Containers/HomeDS";
import Atoms from "@Containers/Atoms";
import Molecules from "@Containers/Molecules";
import Organisms from "@Containers/Organisms";
import AstheroidDetail from "@Containers/AstheroidDetail";
import Gallery from "@Containers/Gallery";
import Login from "@Containers/Login";
import NotFound from "@Containers/NotFound";

import ProvideAuth from "@Providers/ProvideAuth";

const App = () => {
  return (
    <ProvideAuth>
      <Router history={createBrowserHistory()}>
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutWS} />
          <AppRoute exact path="/login" component={Login} layout={LayoutWS} />
          <AppRoute
            exact
            path="/register"
            component={Login}
            layout={LayoutWS}
          />
          <AppRoute
            exact
            private
            path="/gallery"
            component={Gallery}
            layout={LayoutWS}
          />
          <AppRoute
            exact
            private
            path="/astheroids"
            component={Astheroids}
            layout={LayoutWS}
          />
          <AppRoute
            exact
            private
            path="/astheroids/:id"
            component={AstheroidDetail}
            layout={LayoutWS}
          />
          <AppRoute exact path="/ds" component={HomeDS} layout={LayoutDS} />
          <AppRoute path="/ds/atoms" component={Atoms} layout={LayoutDS} />
          <AppRoute
            path="/ds/molecules"
            component={Molecules}
            layout={LayoutDS}
          />
          <AppRoute
            path="/ds/organisms"
            component={Organisms}
            layout={LayoutDS}
          />
          <AppRoute component={NotFound} layout={LayoutWS} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default App;
