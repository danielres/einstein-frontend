'use strict';

var React = require('react')
var Reflux = require('reflux')

var GroupActions = require('./group_actions')
var GroupStore   = require('./group_store')

var B  = require('react-bootstrap')
var Link  = require('react-router').Link


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


module.exports = Container;
