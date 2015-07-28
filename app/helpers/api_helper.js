'use strict';

var request = require('superagent');
var GroupsActions = require('../actions/groups_actions');
var DiscussionsActions = require('../actions/discussions_actions');
var GroupActions = require('../actions/group_actions');
var SessionActions = require('../actions/session_actions');

var FAKE_API_URL = window.location.href.includes(":8080/") ? 'http://localhost:3001' : '/api/fake';
var REAL_API_URL = 'http://localhost:3000';

function urlize(type){
  return { "Group": "groups" }[type];
}

var ENDPOINTS = {
  signIn:
    FAKE_API_URL,
    // REAL_API_URL,
  access:
    FAKE_API_URL,
    // REAL_API_URL,
  fetchGroup:
    // SUPPORT REMOVED IN FAKE API,
    REAL_API_URL + "/api/v1",
  fetchGroups:
    // SUPPORT REMOVED IN FAKE API,
    REAL_API_URL + "/api/v1",
  createGroup:
    // SUPPORT REMOVED IN FAKE API,
    REAL_API_URL + "/api/v1",
  createDiscussion:
    // SUPPORT NOT AVAILABLE IN FAKE API,
    REAL_API_URL + "/api/v1",
  fetchGroupDiscussion:
    // SUPPORT REMOVED IN FAKE API,
    REAL_API_URL + "/api/v1",
  fetchPerson:
    FAKE_API_URL,
}


var ApiHelper = {
  fetchGroups: function () {
    request
      .get(ENDPOINTS.fetchGroups + "/groups")
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function (err, res) {
        if(err){
          console.log(err);
        }else{
          GroupsActions.fetch.completed(res.body)
        }
      });
  },

  fetchGroup: function (groupId) {
    request
      .get(ENDPOINTS.fetchGroup + '/groups/' + groupId)
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function (err, res) {
        if(err){
          console.log(err);
        }else{
          GroupActions.fetch.completed(res.body)
        }
      });
  },

  createGroup: function (params) {
    request
      .post(ENDPOINTS.createGroup + '/groups/')
      .send(params)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function(err, res){
        if(err){
          GroupsActions.create.failed(res.body);
        }else{
          GroupsActions.create.completed();
        }
      });
  },

  fetchGroupDiscussion: function (groupId, discussionId, caller) {
    request
      .get(ENDPOINTS.fetchGroupDiscussion + "/groups/" + groupId + "/discussions/" + discussionId)
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function (err, res) {
        caller.discussion = res.body;
        caller.trigger(caller.discussion);
      }.bind(caller));
  },

  createDiscussion: function (params) {
    request
      .post(ENDPOINTS.createDiscussion
              + "/"+ urlize(params["discutable_type"])
              + "/"+ params["discutable_id"]
              + "/discussions/")
      .send(params)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function(err, res){
        if(err){
          DiscussionsActions.create.failed(res.body);
        }else{
          DiscussionsActions.create.completed(res.body);
        }
      });
  },

  fetchPerson: function (personId, caller) {
    request
      .get(ENDPOINTS.fetchPerson + '/people/' + personId)
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function (err, res) {
        caller.item = res.body;
        caller.trigger(caller.item);
      }.bind(caller));
  },

  signIn: function (username, password) {
    request
      .post(ENDPOINTS.signIn + '/login/')
      .send({ username: username, password: password })
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err){
          console.log(err);
        }else{
          SessionActions.login.completed(res.body);
        }
      });
  },

  access: function () {
    request
      .post(ENDPOINTS.access + '/login/')
      .set('Authorization', sessionStorage.getItem('access_token'))
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err){
          console.log(err);
        }else{
          SessionActions.access.completed(res.body);
        }
      });
  }

};

module.exports = ApiHelper;
