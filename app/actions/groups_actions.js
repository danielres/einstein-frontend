'use strict';

var Reflux  = require('reflux');

var GroupsActions = Reflux.createActions({
  load: {},
  create: { children: ["completed","failed"]}
});

module.exports = GroupsActions;
