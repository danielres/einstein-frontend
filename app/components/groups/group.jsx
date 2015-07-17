'use strict';

var React = require('react')
var Reflux = require('reflux')

var GroupActions = require('../../actions/group_actions')
var GroupStore   = require('../../stores/group_store')

var Meta   = require('../meta')

var B  = require('react-bootstrap')

var faker = require("faker");

var PersonAvatar = require('../person_avatar');
var DiscussionsList = require('../discussions/discussions_list');
var Discussion = require('../discussions/discussion');


var RouteHandler = React.createClass({
  contextTypes: { router: React.PropTypes.func },

  render: function() {
    var groupId      = this.context.router.getCurrentParams().groupId;
    var discussionId = this.context.router.getCurrentParams().discussionId;

    return (
      <GroupLoader groupId={groupId} discussionId={discussionId} />
    );
  }
});


var GroupLoader = React.createClass({
  mixins: [Reflux.connect(GroupStore, "item")],

  componentWillMount: function () {
    GroupActions.load(this.props.groupId);
  },

  componentWillReceiveProps: function () {
    GroupActions.load(this.props.groupId);
  },

  render: function() {
    var group = this.state.item;
    var discussionId = this.props.discussionId;
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
                <DiscussionsList discussions={discussions} />
                <div>
                  <B.Button bsSize="xsmall">
                    <B.Glyphicon glyph='plus' bsSize="xsmall" />
                  </B.Button>
                </div>

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
                <Discussion discussionId={discussionId} />
              </B.Col>
            </B.Row>

          </B.Col>
        </B.Row >
      </div>
    );
  }

});


module.exports = RouteHandler;
