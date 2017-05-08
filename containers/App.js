/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule App
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Landing from './Landing';
import Header from './Header';
import Menu from './Menu';
import Signup from './Signup';

import { fetchMe, auth, signup, logout, isAuthenticated } from '../actions';

import * as firebase from "firebase";
import Firebase from "../components/firebase/firebase";

var shallowCompare = require('react-addons-shallow-compare');

class App extends Component {
  constructor(props) {
    super(props);

    Firebase.initialise();

    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleLogin(email, password) {
    this.props.dispatch(auth(email, password))
  }

  handleSignup(email, password) {
    this.props.dispatch(signup(email, password))
  }

  render() {

    const { location, children, loggedIn, user, dispatch } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);

    if (!loggedIn) {
      return (
        <Landing onLogin={this.handleLogin} onSignup={this.handleSignup}/>
      )
    } else {
      return (
        <section className="vbox">
          <section className="hbox stretch">
              <Menu user={user}
                currentPage={value} />
              <section id="content">
                <Header user={user} route={this.props.routes[1]} />
                {children}
              </section>
          </section>
        </section>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.app.loggedIn,
    token: state.app.token,
    user: state.user
  };
}

export default connect(mapStateToProps)(App);
