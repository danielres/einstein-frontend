'use strict';

var React = require('react')
var Reflux = require('reflux')

var GroupActions = require('../../actions/group_actions')
var GroupStore   = require('../../stores/group_store')

var Meta   = require('../meta')

var B  = require('react-bootstrap')

var faker = require("faker");

var PersonAvatar = require('../person_avatar');


var Container = React.createClass({
  mixins: [Reflux.connect(GroupStore, "item")],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentWillMount: function () {
    var groupId = this.context.router.getCurrentParams().groupId;
    GroupActions.load(groupId);
  },
  componentWillReceiveProps: function () {
    var groupId = this.context.router.getCurrentParams().groupId;
    GroupActions.load(groupId);
  },
  render: function() {
    var group = this.state.item;
    return(
      <Group group={group} />
    );
  }
});


var Group = React.createClass({
  render: function() {
    var group = this.props.group;
    var owner = group.owner;
    var discussions = group.discussions;

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
                <DiscussionsListComponent discussions={discussions} />
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
                <EmptyComment />
                { group.members.map(function(m, i){
                  return (
                    <div>
                      <Comment author={group.members[3]} follow reply />
                      <Comment author={group.members[0]} follow reply>
                        <Comment author={group.members[1]} />
                      </Comment>
                      <Comment author={group.members[1]} follow reply />
                    </div>
                  )
                })}
              </B.Col>
            </B.Row>

          </B.Col>
        </B.Row >




      </div>
    );
  }

});


var DiscussionsListComponent = React.createClass({
  render: function() {
    var discussions = this.props.discussions;
    return(
      <div>
        { discussions && _.map(discussions, function(discussion, i){
          return(
            <div>
              {discussion.title}
              <hr style={{ margin: "10px 0" }} />
            </div>
          )
        })}
      </div>
    );
  }
});



var EmptyComment = React.createClass({
  render: function() {
      var avatar = faker.internet.avatar();
      var name   = faker.name.findName();
    return(
      <div>
          <B.Row>
            <B.Col md={1}>
              <img src={avatar} className="img-circle" width="40" alt={name + ' avatar'} title={name} />
            </B.Col>
            <B.Col md={11} style={{ textAlign: 'right'}}>
              <textarea style={{ width: '100%' }} rows="3" name="" id=""></textarea>
              <B.Button bsStyle='primary'>post</B.Button>
            </B.Col>
          </B.Row>
      </div>
    );
  }

});

var Comment = React.createClass({
  render: function() {
      var author = this.props.author;
    return(
      <div>
          <hr />
          <B.Row>
            <B.Col md={1}>
              <PersonAvatar person={author} size={40} />
            </B.Col>
            <B.Col md={10}>
              { faker.lorem.sentences(3)}
              <Meta follow={ this.props.follow } reply={ this.props.reply } repost={ this.props.repost } />
              {this.props.children}
            </B.Col>
          </B.Row>
      </div>
    );
  }

});


module.exports = Container;
