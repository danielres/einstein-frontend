'use strict';

var Reflux  = require('reflux')
var DiscussionsActions = require('../actions/discussions_actions')
var GroupActions = require('../actions/group_actions')

var ApiHelper = require('../helpers/api_helper')


module.exports = Reflux.createStore({

  listenables: [DiscussionsActions],

  onCreate: function (params) {
    ApiHelper.createDiscussion(params);
  },

  onCreateCompleted: function (result) {
    if(result.discutable_type == "Group"){
      GroupActions.fetch(result.discutable_id);
    }
  },

});

