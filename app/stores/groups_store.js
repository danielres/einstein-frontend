'use strict';

var Reflux  = require('reflux')
var GroupsActions = require('../actions/groups_actions')

var ApiHelper = require('../helpers/api_helper')


module.exports = Reflux.createStore({

  listenables: [GroupsActions],

  init: function () {
    this.listenTo(GroupsActions.load, this.fetchData);
  },

  getInitialState: function () {
    this.list = [];
    return this.list;
  },

  fetchData: function () {
    ApiHelper.fetchGroups(this);
  }

});

