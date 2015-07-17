'use strict';

var React = require('react')
var R    = require('react-router')

var DiscussionsList = React.createClass({
 contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var discussions = this.props.discussions;
    var currentGroupId = this.context.router.getCurrentParams().groupId;
    return(
      <div>
        { discussions && _.map(discussions, function(discussion, i){
          return(
            <div>
              <R.Link
                style={{ border: "none" }}
                to="discussion"
                key={i}
                params={{discussionId: discussion.id, groupId: currentGroupId}}>
                  {discussion.title}
              </R.Link>
              <hr style={{ margin: "15px 0" }} />
            </div>
          )
        })}
      </div>
    );
  }
});


module.exports = DiscussionsList;
