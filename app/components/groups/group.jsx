'use strict';

var React = require('react')
var Reflux = require('reflux')

var GroupActions = require('../../actions/group_actions')
var GroupStore   = require('../../stores/group_store')

var Meta   = require('../meta')

var B  = require('react-bootstrap')

var faker = require("faker");

var PersonAvatar = require('../person_avatar');
var DiscussionsMenu = require('../discussions/discussions_menu');
var DiscussionsList = require('../discussions/discussions_list');
var Discussion = require('../discussions/discussion');


var Container = React.createClass({
  mixins: [Reflux.connect(GroupStore, "group")],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentWillMount: function () {
    var groupId = this.context.router.getCurrentParams().groupId;
    GroupActions.fetch(groupId);
  },
  componentWillReceiveProps: function () {
    var groupId = this.context.router.getCurrentParams().groupId;
    GroupActions.fetch(groupId);
  },
  render: function() {
    var group = this.state.group;
    var discussionId = this.context.router.getCurrentParams().discussionId;

    return(
      <Group group={group} discussionId={discussionId} />
    );
  }
});


var Group = React.createClass({
  render: function() {
    var group = this.props.group;
    var owner = group.owner;
    var discussions = group.discussions;
    var discussionId = this.props.discussionId;
    return(
      <div>
        <B.Row >
          <B.Col md={12}>
            <br />
            <B.PageHeader>
              {group.name}<br /><small>{group.description}</small>
            </B.PageHeader>

            <B.Row >
              <B.Col md={3}>
                <DiscussionsMenu discutable_type="Group" discutable_id={group.id} />
                <DiscussionsList discussions={discussions} />
                <br />
                <br />
                <br />

                <p className="text-muted">Members</p>
                <ul className="list-inline" style={{ padding: "0 30px 0 0" }}>
                  { group.members.map(function(member){
                    return(
                      <li style={{ marginBottom: "10px"}}>
                        <PersonAvatar person={member} size={40} />
                      </li>
                    )
                  })}
                </ul>
              </B.Col>

              <B.Col md={9}>
                { discussionId ?
                  <Discussion groupId={group.id} discussionId={discussionId} />
                  : <GroupDashboard />
                }
              </B.Col>
            </B.Row>

          </B.Col>
        </B.Row >
      </div>
    );
  }

});

var GroupDashboard = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Recent activity</h3>
        <ul>
          <li>[Latests conversations]</li>
          <li>[Latests documents]</li>
        </ul>
      </div>
    );
  }
});

module.exports = Container;
