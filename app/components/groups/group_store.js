'use strict';

var Reflux  = require('reflux')
var GroupActions = require('./group_actions')

var ApiHelper = require('./../helpers/api_helper.js')


module.exports = Reflux.createStore({

  listenables: [GroupActions],

  init: function () {
    this.listenTo(GroupActions.load, this.fetchData);

  },

  getInitialState: function () {
    this.item = { members: [] };
    return this.item;
  },

  fetchData: function (groupId) {

    ApiHelper.fetchGroup(groupId, this);
  }

});

