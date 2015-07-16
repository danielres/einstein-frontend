'use strict';

var React = require('react');
var Link  = require('react-router').Link


var PersonAvatar = React.createClass({
  render: function(){
    var person = this.props.person;
    var size   = this.props.size || 50;

    return(
      <Link to="person" params={{personId: person.id}}>
        <img src={person.avatar} className="img-circle" width={size} alt={person.name + ' avatar'} title={person.name} />
      </Link>
    );
  }
});


module.exports = PersonAvatar;
