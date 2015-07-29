'use strict';

var Reflux  = require('reflux')
var SessionActions = require('actions/session_actions')

var ApiHelper = require('helpers/api_helper')


module.exports = Reflux.createStore({

  listenables: [SessionActions],

  getInitialState: function () {
    this.user = { logged: false };
    return this.user;
  },

  onLogin: function (email, password) {
    ApiHelper.signIn(email, password);
  },

  onLoginCompleted: function (result) {
    this.user = result;
    this.user.logged = true;
    sessionStorage.setItem('access_token', this.user.access_token);
    this.trigger(this.user);
  },

  onAccess: function () {
    var access_token = sessionStorage.getItem('access_token');
    ApiHelper.access(this);
    return this.user;
  },

  onAccessCompleted: function (result) {
    this.user = result;
    this.user.logged = true;
    this.trigger(this.user);
  },

  onLogout: function () {
    this.getInitialState();
    sessionStorage.removeItem('access_token');
    this.trigger(this.user);
  }

});

