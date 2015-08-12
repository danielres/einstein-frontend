'use strict';

var React = require('react');
var Link  = require('react-router').Link;


var PersonAvatar = React.createClass({
  displayName: 'PersonAvatar',

  render: function(){
    var person = this.props.person;
    var size   = this.props.size || 50;

    return (
      <Link
        params={{personId: person.id}}
        to="person"
      >
        <img
          alt={person.username + ' avatar'}
          className="img-circle"
          src={person.avatar}
          title={person.username}
          width={size}
        />
      </Link>
    );
  }
});


module.exports = PersonAvatar;
