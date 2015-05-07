'use strict';

var request = require('superagent');
var API_URL = 'http://localhost:3000';

var ApiHelper = {
  fetchGroups: function (that) {
    request
      .get(API_URL + "/groups", function (err, res) {
        that.list =  res.body;
        that.trigger(that.list);
      }.bind(that));
  },

  fetchGroup: function (groupId, that) {
    request
      .get(API_URL + '/groups/' + groupId, function (err, res) {
        that.item = res.body;
        that.trigger(that.item);
      }.bind(that));
  },

  fetchPerson: function (personId, that) {
    request
      .get(API_URL + '/people/' + personId, function (err, res) {
        that.item = res.body;
        that.trigger(that.item);
      }.bind(that));
  }

};

module.exports = ApiHelper;
