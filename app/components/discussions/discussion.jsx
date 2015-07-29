'use strict';

var React = require('react');
var Reflux = require('reflux');

var B = require('react-bootstrap');

var DiscussionActions = require('actions/discussion_actions');
var DiscussionStore   = require('stores/discussion_store');

var PersonAvatar = require('components/person_avatar');
var Meta = require('components/meta');


var DiscussionLoader = React.createClass({
  displayName: 'DiscussionLoader',
  mixins:      [Reflux.connect(DiscussionStore, 'discussion')],

  componentWillReceiveProps: function () {
    DiscussionActions.load(this.props.groupId, this.props.discussionId);
  },

  render: function() {
    return (<Discussion discussion={this.state.discussion} />);
  }
});


var Discussion = React.createClass({
  displayName: 'Discussion',

  render: function() {
    var discussion = this.props.discussion;

    return (
      <div>
        <div className="text-right">
          <Meta follow={true} />
        </div>
        <EntriesList entries={discussion.entries} />
      </div>
    );
  }
});


var Entry = React.createClass({
  displayName: 'Entry',

  render: function() {
    var entry = this.props.entry;
    var author = entry.author;
    var childrenEntries = entry.entries;

    return (
      <div>
          <hr />
          <B.Row>
            <B.Col md={1}>
              <PersonAvatar person={author} size={40} />
            </B.Col>
            <B.Col md={10}>
              { entry.body }
              <Meta
                follow={this.props.follow}
                reply={this.props.reply}
                repost={this.props.repost} />
              { childrenEntries && <EntriesList entries={childrenEntries} /> }
            </B.Col>
          </B.Row>
      </div>
    );
  }
});


var EntriesList = React.createClass({
  displayName: 'Entry',

  render: function() {
    var entries = this.props.entries;

    return (
      <div>
        { entries && entries.map(function(entry, i){
          return (
            <Entry
              entry={entry}
              follow={true}
              key={i}
              reply={true}
              repost={true}
            />
          );
        })}
      </div>
    );
  }
});


module.exports = DiscussionLoader;
