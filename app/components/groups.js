'use strict';

var React  = require('react')
var Reflux = require('reflux')

var B  = require('react-bootstrap')
var RB = require('react-router-bootstrap')

var GroupsActions = require('./groups/actions')
var GroupsStore   = require('./groups/store')

var Link = require('react-router').Link


var Groups = React.createClass({
  mixins: [Reflux.connect(GroupsStore, "list")],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function () {
      GroupsActions.load();
  },
  render: function() {
    var groups  = this.state.list;
    var groupId = this.context.router.getCurrentParams().groupId;
    var group   = groups[groupId];
    return (
      <B.Row>
        <B.Col md={8}>
          { group && <Group group={group} /> || "GROUP INDEX" }
        </B.Col>
        <B.Col md={4}>
          <GroupsList groups={groups} />
        </B.Col>
      </B.Row>
    );
  }
});

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

var Group = React.createClass({
  render: function() {
    var group = this.props.group;
    return (
      <div>
        <B.PageHeader>{group.name} <small>description</small></B.PageHeader>
        <ul className="list-inline">
          { group.members.map(function(m, i){
                return (
                  <li>
                    <Link to="person" params={{personId: m.id}}>
                      <img src={m.avatar} className="img-circle" width="80" alt={m.name + ' avatar'} title={m.name} />
                    </Link>
                  </li>
                )
              })}
        </ul>
        <hr/>
        <p>(Details)</p>
      </div>
    );
  }
});


module.exports = Groups;
