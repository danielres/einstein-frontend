'use strict';

var Reflux  = require('reflux')
var request = require('superagent')

var PersonActions = require('./actions')

var BASE_URL = 'http://localhost:3000/people'


module.exports = Reflux.createStore({

  listenables: [PersonActions],

  init: function () {
    this.listenTo(PersonActions.load, this.fetchData);
  },

  getInitialState: function () {
    this.item = {};
    return this.item;
  },

  fetchData: function (personId) {
    request
      .get( BASE_URL + '/' + personId, function (err,res) {
          this.item = res.body;
          this.trigger(this.item);
        }.bind(this));
  }

});

