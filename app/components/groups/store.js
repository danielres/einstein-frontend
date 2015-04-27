'use strict';

var Reflux  = require('reflux')
var request = require('superagent')

var GroupsActions = require('./actions')

var GROUPS_URL = 'http://localhost:3000/groups'


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
    request
      .get( GROUPS_URL, function (err,res) {
          this.list = res.body;
          this.trigger(this.list);
        }.bind(this));
  }

});

