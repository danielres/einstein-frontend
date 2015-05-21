'use strict';

var React  = require('react')

var B  = require('react-bootstrap')

var GroupsDashboard = require('./groups/groups_dashboard')
var GroupsList = require('./groups/groups_list')
var Group      = require('./groups/group')


var Groups = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    var groupId = this.context.router.getCurrentParams().groupId;

    return (
      <B.Row>
        <B.Col md={8}>
          { groupId && <Group groupId={groupId} /> || <GroupsDashboard /> }
        </B.Col>
        <B.Col md={4}>
          <GroupsList />
        </B.Col>
      </B.Row>
    );
  }
});




module.exports = Groups;
