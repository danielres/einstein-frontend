'use strict';

var request = require('superagent');
var API_URL = window.location.href.includes(":8080/") ? 'http://localhost:3000' : '/api/fake';


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
  },

  signIn: function (username, password, that) {
    request
      .post(API_URL + '/login/')
      .send({ username: username, password: password })
      .set('Accept', 'application/json')
      .end(function(err, res){
        that.user = res.body;
        that.user.logged = true;
        that.trigger(that.user);
      }.bind(that));
  }

};

module.exports = ApiHelper;
