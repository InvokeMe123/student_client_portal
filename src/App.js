import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './template/login';
import UserRegistration from './template/registration';
import TeacherLandingPage from './components/TeacherLandingPage';
import StudentLandingPage from './components/StudentLandingPage';  // Import the student landing page

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginForm} />
        <Route path="/register" component={UserRegistration} />
        <Route path="/teacher" component={TeacherLandingPage} />
        <Route path="/student" component={StudentLandingPage} /> {/* Add Student Landing Page Route */}
        <Route path="/" exact component={LoginForm} />
      </Switch>
    </Router>
  );
};

export default App;
