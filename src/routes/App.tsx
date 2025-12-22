import { Switch, Route } from 'wouter';
import LayoutDS from '../layouts/LayoutDS';
import LayoutWS from '../layouts/LayoutWS';
import Home from '../containers/Home';
import Astheroids from '../containers/Astheroids';
import HomeDS from '../containers/HomeDS';
import Atoms from '../containers/Atoms';
import Molecules from '../containers/Molecules';
import Organisms from '../containers/Organisms';
import AstheroidDetail from '../containers/AstheroidDetail';
import Gallery from '../containers/Gallery';
import NotFound from '../containers/NotFound';

const App = () => {
  return (
    <Switch>
      <Route path="/">
        <LayoutWS><Home /></LayoutWS>
      </Route>
      <Route path="/gallery">
        <LayoutWS><Gallery /></LayoutWS>
      </Route>
      <Route path="/astheroids">
        <LayoutWS><Astheroids /></LayoutWS>
      </Route>
      <Route path="/astheroids/:id">
        <LayoutWS><AstheroidDetail /></LayoutWS>
      </Route>
      <Route path="/ds">
        <LayoutDS><HomeDS /></LayoutDS>
      </Route>
      <Route path="/ds/atoms">
        <LayoutDS><Atoms /></LayoutDS>
      </Route>
      <Route path="/ds/molecules">
        <LayoutDS><Molecules /></LayoutDS>
      </Route>
      <Route path="/ds/organisms">
        <LayoutDS><Organisms /></LayoutDS>
      </Route>
      <Route>
        <LayoutWS><NotFound /></LayoutWS>
      </Route>
    </Switch>
  );
};

export default App;