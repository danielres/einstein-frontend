'use strict';

var GROUPS_URL = 'http://localhost:3000/groups';

var Reflux  = require('reflux');
var request = require('superagent');

var GroupsActions = require('./groups_actions');

var GroupsStore = Reflux.createStore({

  listenables: [GroupsActions],

  init: function () {
    this.listenTo(GroupsActions.load, this.fetchData);
  },

  getInitialState: function () {
    this.list = [];
    return this.list;
  },

  fetchData: function () {
    request
      .get( GROUPS_URL, function (err,res) {
          this.list = res.body;
          this.trigger(this.list);
        }.bind(this));
  }

});

module.exports = GroupsStore;
