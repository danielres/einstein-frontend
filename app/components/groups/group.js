'use strict';

var React = require('react')
var Reflux = require('reflux')

var GroupActions = require('./group_actions')
var GroupStore   = require('./group_store')

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


var Group = React.createClass({
  render: function() {
    var group = this.props.group


    return(
      <div>
        <B.PageHeader>{group.name}<br /><small>{group.description}</small></B.PageHeader>

        <ul className="list-inline">
          { group.members.map(function(m, i){
            return (
              <li>
                <Link to="person" params={{personId: m.id}}>
                  <img src={m.avatar} style={{marginBottom: '10px'}} className="img-circle" width="40" alt={m.name + ' avatar'} title={m.name} />
                </Link>
              </li>
            )
          })}
        </ul>


        <br />
        <br />


        <h3>Discussions</h3>

        { group.members.map(function(m, i){
          return (
            <div>
              <Comment />
              <Comment>
                <Comment />
                <Comment />
                <Comment />
              </Comment>
              <Comment />
              <Comment />
            </div>
          )
        })}
        <hr />





      </div>
    );
  }

});

var Comment = React.createClass({
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
            <B.Col md={10}>
              { faker.lorem.sentences(3)}
              <div>
                <small className="text-muted">{2} days</small>
              </div>
              {this.props.children}
            </B.Col>
          </B.Row>
      </div>
    );
  }

});

module.exports = Container;
