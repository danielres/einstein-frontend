'use strict';

var Reflux  = require('reflux');

var SessionActions = Reflux.createActions([
  "login",
  "logout",
  "access",
]);

module.exports = SessionActions;
