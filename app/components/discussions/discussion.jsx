'use strict';

var React = require('react');
var Reflux = require('reflux');

var DiscussionActions = require('../../actions/discussion_actions');
var DiscussionStore   = require('../../stores/discussion_store');


var DiscussionLoader = React.createClass({
  mixins: [Reflux.connect(DiscussionStore, "discussion")],

  componentWillReceiveProps: function () {
    DiscussionActions.load(this.props.discussionId);
  },

  render: function() {
    return(<Discussion discussion={this.state.discussion} />);
  }
});


var Discussion = React.createClass({
  render: function() {
    var discussion = this.props.discussion;
    return (
      <div>
        <h4>{discussion.title}</h4>
        <p>{discussion.author && discussion.author.name}</p>
      </div>
    );
  }
});


module.exports = DiscussionLoader;
