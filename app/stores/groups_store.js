'use strict';

var Reflux  = require('reflux')
var GroupsActions = require('../actions/groups_actions')

var ApiHelper = require('../helpers/api_helper')


module.exports = Reflux.createStore({

  listenables: [GroupsActions],

  getInitialState: function () {
    return [];
  },

  onLoad: function () {
    ApiHelper.fetchGroups(this);
  },

  onCreate: function (params) {
    ApiHelper.createGroup(params);
  },

  onCreateCompleted: function() {
    this.onLoad();
  },

});

