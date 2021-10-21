import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import List from './Events/List';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={ List } />
          <Route path='/event/:id' />
        </Switch>
      </Router>
  )
};

export default App;
