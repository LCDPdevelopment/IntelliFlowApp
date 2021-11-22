import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ApplicationCreator from './applicationCreator/ApplicationCreator';

import * as themes from './theme/schema.json';
import { setToLS } from './utils/storage';
import ApplyLeave from './ApplyLeave';
import ApplicationTab from './ApplicationTab';

const Index = () => {
  console.log(themes.default);
  setToLS('all-themes', themes.default);

  return(
    <Router>
    <Switch>
    <Route exact path="/">
      <ApplicationTab />
      </Route>
      <Route exact path="/leave">
      <ApplyLeave />
      </Route>
      <Route exact path="/theme">
      <App />
      </Route>
      <Route exact path="/app">
      <ApplicationCreator />
      </Route>
    </Switch>
  </Router>
   
  )
}

ReactDOM.render(
    <Index />,
  document.getElementById('root')
);

