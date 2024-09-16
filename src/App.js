import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './template/login';
import UserRegistration from './template/registration';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginForm} />
        <Route path="/register" component={UserRegistration} />
        <Route path="/" exact component={LoginForm} />
      </Switch>
    </Router>
  );
};

export default App;