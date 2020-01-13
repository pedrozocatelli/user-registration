import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import New from './pages/New';
import List from './pages/List';
import User from './pages/User';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/list" component={List} />
        <Route path="/new" component={New} />
        <Route path="/user" component={User} />
      </Switch>
    </BrowserRouter>
  );
}
