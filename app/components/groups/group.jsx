'use strict';

var React = require('react');
var Reflux = require('reflux');

var GroupActions = require('actions/group_actions');
var GroupStore   = require('stores/group_store');

var B  = require('react-bootstrap');

var PersonAvatar = require('components/person_avatar');
var DiscussionsMenu = require('components/discussions/discussions_menu');
var DiscussionsList = require('components/discussions/discussions_list');
var Discussion = require('components/discussions/discussion');


var Container = React.createClass({
  displayName:  'Group Container',
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [ Reflux.connect( GroupStore, 'group') ],

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

    return (
      <Group
        group={group}
        discussionId={discussionId}
      />
    );
  }
});


var Group = React.createClass({
  displayName: 'Group',

  render: function() {
    var group = this.props.group;
    var discussions = group.discussions;
    var discussionId = this.props.discussionId;

    return (
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
                <ul className="list-inline" style={{ padding: '0 30px 0 0' }}>
                  { group.members && group.members.map(function(member){
                    return (
                      <li style={{ marginBottom: '10px'}}>
                        <PersonAvatar person={member} size={40} />
                      </li>
                    );
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
  displayName: 'Group Dashboard',

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
