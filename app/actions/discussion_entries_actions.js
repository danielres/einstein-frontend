'use strict';

var Reflux  = require('reflux');

var DiscussionEntriesActions = Reflux.createActions({
  fetch:  { children: ['completed', 'failed'] },
});

module.exports = DiscussionEntriesActions;
