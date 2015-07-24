'use strict';

var request = require('superagent');
var GroupsActions = require('../actions/groups_actions');

var FAKE_API_URL = window.location.href.includes(":8080/") ? 'http://localhost:3001' : '/api/fake';
var REAL_API_URL = 'http://localhost:3000';


var ENDPOINTS = {
  signIn:
    FAKE_API_URL,
    // REAL_API_URL,
  access:
    FAKE_API_URL,
    // REAL_API_URL,
  fetchGroup:
    FAKE_API_URL,
    // REAL_API_URL + "/api/v1",
  fetchGroups:
    FAKE_API_URL,
    // REAL_API_URL + "/api/v1",
  createGroup:
    FAKE_API_URL,
    // REAL_API_URL + "/api/v1",
  fetchGroupDiscussion:
    FAKE_API_URL,
    // REAL_API_URL + "/api/v1",
  fetchPerson:
    FAKE_API_URL,
}


var ApiHelper = {
  fetchGroups: function (that) {
    request
      .get(ENDPOINTS.fetchGroups + "/groups")
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function (err, res) {
        that.list =  res.body;
        that.trigger(that.list);
      }.bind(that));
  },

  fetchGroup: function (groupId, that) {
    request
      .get(ENDPOINTS.fetchGroup + '/groups/' + groupId)
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function (err, res) {
        that.item = res.body;
        that.trigger(that.item);
      }.bind(that));
  },

  createGroup: function (params, that) {
    request
      .post(ENDPOINTS.createGroup + '/groups/')
      .send(params)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function(err, res){
        if(err){
          GroupsActions.create.failed(res.body);
        }else{
          res.group = res.body;
          GroupsActions.create.completed();
          GroupsActions.load();
        }
      }.bind(that));
  },

  fetchGroupDiscussion: function (groupId, discussionId, that) {
    request
      .get(ENDPOINTS.fetchGroupDiscussion + "/groups/" + groupId + "/discussions/" + discussionId)
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function (err, res) {
        that.discussion = res.body;
        that.trigger(that.discussion);
      }.bind(that));
  },

  fetchPerson: function (personId, that) {
    request
      .get(ENDPOINTS.fetchPerson + '/people/' + personId)
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function (err, res) {
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
