'use strict';

var React = require('react')
var RB    = require('react-router-bootstrap')

var GroupsList = React.createClass({
    render: function () {
        return (
            <div>
              { this.props.groups.map(function(group, i){
                var headerText = "Group " + (group.id + 1);
                return <RB.ListGroupItemLink to="group" key={i} params={{groupId: group.id}} header={headerText}>description</RB.ListGroupItemLink>
              })}
            </div>
        );
    }
});

module.exports = GroupsList;
