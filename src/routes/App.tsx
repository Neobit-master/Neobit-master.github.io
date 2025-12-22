import { lazy, Suspense } from 'react';
import { Switch, Route } from 'wouter';
import LayoutDS from '../layouts/LayoutDS';
import LayoutWS from '../layouts/LayoutWS';
import Loading from '../components/molecules/Loading';

const Home = lazy(() => import('../containers/Home'));
const Gallery = lazy(() => import('../containers/Gallery'));
const Astheroids = lazy(() => import('../containers/Astheroids'));
const AstheroidDetail = lazy(() => import('../containers/AstheroidDetail'));
const HomeDS = lazy(() => import('../containers/HomeDS'));
const Atoms = lazy(() => import('../containers/Atoms'));
const Molecules = lazy(() => import('../containers/Molecules'));
const Organisms = lazy(() => import('../containers/Organisms'));
const NotFound = lazy(() => import('../containers/NotFound'));

const App = () => {
  return (
    <Suspense fallback={<LayoutWS><Loading /></LayoutWS>}>
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
    </Suspense>
  );
};

export default App;