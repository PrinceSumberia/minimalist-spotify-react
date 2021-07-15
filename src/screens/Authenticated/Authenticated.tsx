import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import Layout from '../../components/Layout';
import Browse from '../Browse';
import Category from '../Category';
import Dashboard from '../Dashboard';
import Library from '../Library';
import Search from '../Search';
import TrackAnalysis from '../TrackAnalysis';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/tracks/:id">
        <TrackAnalysis />
      </Route>
      <Route exact path="/library">
        <Library />
      </Route>
      <Route exact path="/browse">
        <Browse />
      </Route>
      <Route exact path="/browse/category/:id">
        <Category />
      </Route>
      <Route exact path="/search">
        <Search />
      </Route>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="*">
        <h1>Page Not Found</h1>
        <a href="/">Go To Home</a>
      </Route>
    </Switch>
  );
}

const Authenticated = (): JSX.Element => (
  <Layout>
    <AppRoutes />
  </Layout>
);

export default Authenticated;
