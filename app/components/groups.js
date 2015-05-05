'use strict';

var React  = require('react')
var Reflux = require('reflux')

var B  = require('react-bootstrap')
var RB = require('react-router-bootstrap')

var GroupsActions = require('./groups/actions')
var GroupsStore   = require('./groups/store')


var Groups = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    var groupId = this.context.router.getCurrentParams().groupId;
    return (
      <B.Row>
        <B.Col md={8}>
          { groupId && <Group groupId={groupId} /> || "SOME INFO" }
        </B.Col>
        <B.Col md={4}>
          <GroupsList />
        </B.Col>
      </B.Row>
    );
  }
});

var GroupsList = React.createClass({
    mixins: [Reflux.connect(GroupsStore, "list")],
    componentDidMount: function () {
        GroupsActions.load();
    },
    render: function () {
        var groups = this.state.list;
        return (
            <div>
              { groups.map(function(group, i){
                var headerText = "Group " + group.id;
                return <RB.ListGroupItemLink to="group" key={i} params={{groupId: group.id}} header={headerText}>description</RB.ListGroupItemLink>
              })}

            </div>
        );
    }
});

var Group = React.createClass({
  render: function() {
    return (
      <div>
        <B.PageHeader>Group {this.props.groupId} <small>description</small></B.PageHeader>
        <p>(Details)</p>
      </div>
    );
  }
});


module.exports = Groups;
