'use strict';

var request = require('superagent');

var FAKE_API_URL = window.location.href.includes(":8080/") ? 'http://localhost:3001' : '/api/fake';
var REAL_API_URL = 'http://localhost:3000';

var ENDPOINTS = {
  fetchGroups: FAKE_API_URL,
  fetchGroup:  FAKE_API_URL,
  fetchPerson: FAKE_API_URL,
  signIn:      REAL_API_URL,
  access:      REAL_API_URL,
}

var ApiHelper = {
  fetchGroups: function (that) {
    request
      .get(ENDPOINTS.fetchGroups + "/groups", function (err, res) {
        that.list =  res.body;
        that.trigger(that.list);
      }.bind(that));
  },

  fetchGroup: function (groupId, that) {
    request
      .get(ENDPOINTS.fetchGroup + '/groups/' + groupId, function (err, res) {
        that.item = res.body;
        that.trigger(that.item);
      }.bind(that));
  },

  fetchPerson: function (personId, that) {
    request
      .get(ENDPOINTS.fetchPerson + '/people/' + personId, function (err, res) {
        that.item = res.body;
        that.trigger(that.item);
      }.bind(that));
  },

  signIn: function (username, password, that) {
    request
      .post(ENDPOINTS.signIn + '/login/')
      .send({ username: username, password: password })
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err){
          console.log(err);
        }else{
          that.user = res.body;
          that.user.logged = true;
          that.trigger(that.user);
          sessionStorage.setItem('access_token', that.user.access_token);
        }
      }.bind(that));
  },

  access: function (that) {
    request
      .post(ENDPOINTS.access + '/login/')
      .set('Authorization', sessionStorage.getItem('access_token'))
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err){
          console.log(err);
        }else{
          that.user = res.body;
          that.user.logged = true;
          that.trigger(that.user);
          sessionStorage.setItem('access_token', that.user.access_token);
        }
      }.bind(that));
  }

};

module.exports = ApiHelper;
