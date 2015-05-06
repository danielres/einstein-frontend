'use strict';

var Reflux  = require('reflux')
var GroupsActions = require('./actions')

var ApiHelper = require('./../helpers/api_helper.js')


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

