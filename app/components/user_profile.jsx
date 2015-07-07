'use strict';

var React = require('react')
var Person         = require('./person');

var UserProfile = React.createClass({
  render: function(){
    return(<Person id={this.props.user.id} is_current_user={true} />);
  }
});

module.exports = UserProfile;
