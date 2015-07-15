'use strict';

var React = require('react')
var Reflux = require('reflux')

var GroupActions = require('../../actions/group_actions')
var GroupStore   = require('../../stores/group_store')

var Meta   = require('../meta')

var B  = require('react-bootstrap')
var Link  = require('react-router').Link

var faker = require("faker");



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

var PersonAvatarComponent = React.createClass({
  render: function(){
    var person = this.props.person;
    var size   = this.props.size || 40;

    return(
      <Link to="person" params={{personId: person.id}}>
        <img src={person.avatar} className="img-circle" width={size} alt={person.name + ' avatar'} title={person.name} />
      </Link>
    );
  }
});


var Group = React.createClass({
  render: function() {
    var group = this.props.group;
    var owner = group.owner;

    return(
      <div>

        <B.PageHeader>

          <B.Row >
            <B.Col md={10}>
              {group.name}<br /><small>{group.description}</small>
            </B.Col>
            <B.Col md={2}>
              { owner &&  <PersonAvatarComponent person={owner} size={80} /> }
            </B.Col>
          </B.Row>


        </B.PageHeader>


        <ul className="list-inline">
          { group.members.map(function(member){
            return( <li><PersonAvatarComponent person={member} /></li> )
          })}
        </ul>


        <br />
        <br />


        <B.Row >
          <B.Col md={7}>
            <h3>Discussions</h3>
          </B.Col>
          <B.Col md={5} style={{ position: 'relative', bottom: '-17px' }}>
            <B.Input type='text' addonBefore={<B.Glyphicon glyph='search' />} />
          </B.Col>
        </B.Row>


        <EmptyComment />

        { group.members.map(function(m, i){
          return (
            <div>
              <Comment author={group.members[3]} follow reply />
              <Comment author={group.members[0]} follow reply>
                <Comment author={group.members[1]} />
                <Comment author={group.members[2]} />
                <Comment author={group.members[3]} />
              </Comment>
              <Comment author={group.members[1]} follow reply />
              <Comment author={group.members[3]} follow reply />
            </div>
          )
        })}
        <hr />





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
          <hr />
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
                <Link to="person" params={{personId: author.id}}>
                  <img src={author.avatar} style={{marginBottom: '10px'}} className="img-circle" width="40" alt={author.name + ' avatar'} title={author.name} />
                </Link>
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
