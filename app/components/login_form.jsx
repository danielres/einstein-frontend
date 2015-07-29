'use strict';

var React = require('react')
var B  = require('react-bootstrap')

var SessionActions = require('actions/session_actions');


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
      <form
        style={{ marginTop: 60 }}
        className='form-horizontal'
        onSubmit={this.handleSubmit}>
      <B.Input
        type='text'
        defaultValue='example@example.com'
        label='Email'
        ref='username'
        labelClassName='col-xs-2 col-md-offset-2'
        wrapperClassName='col-xs-4' />
      <B.Input
        type='password'
        defaultValue='password'
        label='Password'
        ref='password'
        labelClassName='col-xs-2 col-md-offset-2'
        wrapperClassName='col-xs-4' />
      <B.Input
        type='submit'
        label=' '
        labelClassName='col-xs-2  col-md-offset-2'
        wrapperClassName='col-xs-4' />
      </form>
    );
  }

});


module.exports = LoginFormComponent;
