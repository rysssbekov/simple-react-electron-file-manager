// @flow
import React, { Component } from 'react';
import FileManagerPage from './FileManagerPage';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Routes from '../Routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// export default class Root extends Component<Props> {
//   render() {
//     const { store, history } = this.props;
//     return (
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <Routes />
//         </ConnectedRouter>
//       </Provider>
//     );
//   }
// }
export default class Root extends Component<Props> {
  render() {
    return (
    <Router>
      <div>               
      <ul>
        <Link to="/login">Log in</Link>
      </ul>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>               
          <Route path="/home">
            <Redirect to="/login" />
          </Route>              
          <Route path="/login" component={Login}>            
          </Route>
          <Route path="/signup" component={SignUp}>            
          </Route>
          <Route path="/file-manager" component={FileManagerPage}/>
        </Switch>
      </div>
    </Router>
    )
  }
}