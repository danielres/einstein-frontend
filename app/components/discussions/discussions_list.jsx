'use strict';

var React = require('react')


var DiscussionsList = React.createClass({
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


module.exports = DiscussionsList;
