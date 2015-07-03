'use strict';

var React = require('react')

var Reflux = require('reflux');
var SessionStore   = require('../stores/session_store');
var SessionActions = require('../actions/session_actions');


var UserBoxComponent = React.createClass({

  mixins: [Reflux.connect(SessionStore, "user")],


  componentDidMount: function () {
    SessionActions.login('example@example.com', 'password');
  },

  render: function() {
    var user  = this.state.user;

    if (user && user.email) {
      var user_display = "Logged in as: " + user.email;
    } else {
      var user_display = <a href="login">log in</a>;
    }

    return (
      <div>{ user_display }</div>
    );
  }

});


module.exports = UserBoxComponent;
