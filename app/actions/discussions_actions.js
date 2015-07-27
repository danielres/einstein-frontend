'use strict';

var Reflux  = require('reflux');

var DiscussionsActions = Reflux.createActions({
  create: { children: ["completed","failed"]}
});

module.exports = DiscussionsActions;
