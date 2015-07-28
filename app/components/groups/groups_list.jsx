'use strict';

var React = require('react')
var RB    = require('react-router-bootstrap')

var Reflux = require('reflux')
var GroupsStore   = require('../../stores/groups_store')
var GroupsActions = require('../../actions/groups_actions')


var Container = React.createClass({
  mixins: [Reflux.connect(GroupsStore, "list")],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function () {
      GroupsActions.fetch();
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
                return <RB.ListGroupItemLink to="group" key={i} params={{groupId: group.id}} header={headerText}>{group.description}</RB.ListGroupItemLink>
              })}
            </div>
        );
    }
});

module.exports = Container;
