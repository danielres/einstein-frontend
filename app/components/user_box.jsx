'use strict';

var React = require('react')

var Reflux = require('reflux');
var SessionStore   = require('../stores/session_store');
var SessionActions = require('../actions/session_actions');

var B  = require('react-bootstrap')


var UserBoxComponent = React.createClass({

  mixins: [Reflux.connect(SessionStore, "user")],

  render: function() {
    var user  = this.state.user;
    if (user.logged) {
      var user_display = "Logged in as: " + user.email;
    } else {
      var user_display = <LoginFormComponent />;
    }

    return (
      <div>{ user_display }</div>
    );
  }

});

var LoginFormComponent = React.createClass({

  handleSubmit: function(e){
    e.preventDefault();
    SessionActions.login(
      this.refs.username.getValue(),
      this.refs.password.getValue()
    );
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className='form-horizontal'>
      <B.Input
        type='text'
        defaultValue='example@example.com'
        label='Email'
        ref='username'
        labelClassName='col-xs-2'
        wrapperClassName='col-xs-4' />
      <B.Input
        type='password'
        defaultValue='password'
        label='Password'
        ref='password'
        labelClassName='col-xs-2'
        wrapperClassName='col-xs-4' />
      <B.Input
        type='submit'
        label=' '
        labelClassName='col-xs-2'
        wrapperClassName='col-xs-4' />
      </form>
    );
  }

});


module.exports = UserBoxComponent;
