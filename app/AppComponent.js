var React = require('react');
var NavComponent = require('./NavComponent.js');
var GroupsComponent = require('./GroupsComponent.js');

module.exports = React.createClass({
  render: function(){
    return(
      <div>
        <NavComponent />
        <GroupsComponent />
      </div>
    );
  }
});
