'use strict';

var Reflux  = require('reflux')
var DiscussionsActions = require('../actions/discussions_actions')

var ApiHelper = require('../helpers/api_helper')


module.exports = Reflux.createStore({

  listenables: [DiscussionsActions],

  onCreate: function (params) {
    ApiHelper.createDiscussion(params, this);
  },

});

