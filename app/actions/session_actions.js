'use strict';

var Reflux  = require('reflux');

var SessionActions = Reflux.createActions([
  "login",
  "logout",
]);

module.exports = SessionActions;
