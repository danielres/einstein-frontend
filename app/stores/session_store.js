'use strict';

var Reflux  = require('reflux')
var SessionActions = require('../actions/session_actions')

var ApiHelper = require('../helpers/api_helper')


module.exports = Reflux.createStore({

  listenables: [SessionActions],

  getInitialState: function () {
    this.user = { logged: false };
    return this.user;
  },

  onLogin: function (email, password) {
    ApiHelper.signIn(email, password, this);
    return this.user;
  }

});

