'use strict';

var request = require('superagent');
var GroupsActions = require('../actions/groups_actions');
var DiscussionsActions = require('../actions/discussions_actions');
var GroupActions = require('../actions/group_actions');
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
  fetchGroups: function (caller) {
    request
      .get(ENDPOINTS.fetchGroups + "/groups")
      .set('Authorization', sessionStorage.getItem('access_token'))
      .end(function (err, res) {
        caller.list =  res.body;
        caller.trigger(caller.list);
      }.bind(caller));
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

  createDiscussion: function (params, caller) {
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
          res.discussion = res.body;
          DiscussionsActions.create.completed();
          // DiscussionsActions.load();
          GroupActions.fetch(params["discutable_id"]);
          console.log(params["discutable_id"]);
        }
      }.bind(caller));
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

  signIn: function (username, password, caller) {
    request
      .post(ENDPOINTS.signIn + '/login/')
      .send({ username: username, password: password })
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err){
          console.log(err);
        }else{
          caller.user = res.body;
          caller.user.logged = true;
          caller.trigger(caller.user);
          sessionStorage.setItem('access_token', caller.user.access_token);
        }
      }.bind(caller));
  },

  access: function (caller) {
    request
      .post(ENDPOINTS.access + '/login/')
      .set('Authorization', sessionStorage.getItem('access_token'))
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err){
          console.log(err);
        }else{
          caller.user = res.body;
          caller.user.logged = true;
          caller.trigger(caller.user);
          sessionStorage.setItem('access_token', caller.user.access_token);
        }
      }.bind(caller));
  }

};

module.exports = ApiHelper;
