import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/auth/setAuthToken';
import { setCurrentUser, logoutUser } from "./utils/redux/actions/authActions";

import { Provider } from "react-redux";
import store from './utils/redux/store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './private-route/PrivateRoute';

import { Container, Row, Col } from "react-bootstrap";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded));

  const currTime = Date.now() / 1000;
  if (decoded.exp < currTime) {
    store.dispatch(logoutUser());
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Container className="App">
          <Row>
            <Col>
              <Navbar />
            </Col>
          </Row>
          <Row style={{height: "75vh"}} className="valign-wrapper">
            <Col>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
