import React from 'react';
import { Switch, Route, Router, Link } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/FileManagerPage';
import Login from './components/Login';
import SignUp from './components/SignUp';

// export default () => (
//   <App>
//     <Switch>
//       <Route path={routes.LOGIN} component={Login} />
//       <Route path={routes.REGISTER} component={SignUp} />
//     </Switch>
//   </App>
// );
export default () => (
  <Router>
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/sign-up">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route path="/">
            <SignUp />
          </Route>
          <Route path="/sign-up">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
)