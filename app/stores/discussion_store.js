'use strict';

var Reflux  = require('reflux');

var DiscussionActions = require('actions/discussion_actions');
var ApiHelper = require('helpers/api_helper');


module.exports = Reflux.createStore({
  listenables: [DiscussionActions],

  getInitialState: function () {
    return {};
  },

  onLoad: function (groupId, discussionId) {
    ApiHelper.fetchGroupDiscussion(groupId, discussionId, this);
  }
});

