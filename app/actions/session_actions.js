'use strict';

var Reflux  = require('reflux');

var SessionActions = Reflux.createActions({
  login: { children: ["completed","failed"] },
  logout: {},
  access: {},
});

module.exports = SessionActions;
