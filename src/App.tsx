import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import List from './Events/List';
import Detail from './Events/Detail';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={ List } />
          <Route path='/event/:id' component={ Detail } />
        </Switch>
      </Router>
  )
};

export default App;
