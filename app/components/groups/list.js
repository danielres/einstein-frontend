'use strict';

var React = require('react')
var RB    = require('react-router-bootstrap')

var Reflux = require('reflux')
var GroupsStore   = require('./groups_store')
var GroupsActions = require('./groups_actions')


var Container = React.createClass({
  mixins: [Reflux.connect(GroupsStore, "list")],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function () {
      GroupsActions.load();
  },
  render: function() {
    var groups  = this.state.list;
    return (
        <GroupsList groups={groups} />
    );
  }
});



var GroupsList = React.createClass({
    render: function () {
        return (
            <div>
              { this.props.groups.map(function(group, i){
                var headerText = group.name;
                return <RB.ListGroupItemLink to="group" key={i} params={{groupId: group.id}} header={headerText}>description</RB.ListGroupItemLink>
              })}
            </div>
        );
    }
});

module.exports = Container;
