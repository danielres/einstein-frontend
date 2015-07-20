'use strict';

var React = require('react')
var RB   = require('react-router-bootstrap')


var DiscussionsList = React.createClass({
 contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var discussions = this.props.discussions;
    var currentGroupId = this.context.router.getCurrentParams().groupId;
    return(
      <ul className="nav nav-muted">
        { discussions && _.map(discussions, function(discussion, i){
          return(
            <RB.ListGroupItemLink
              to="discussion"
              key={i}
              params={{discussionId: discussion.id, groupId: currentGroupId}}>
                {discussion.title}
            </RB.ListGroupItemLink>
          )
        })}
      </ul>
    );
  }
});


module.exports = DiscussionsList;
