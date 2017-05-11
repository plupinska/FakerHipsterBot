import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

const Root = ({store}) => {

  return(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" />
      </Router>
    </Provider>
  );
};
