'use strict';

var React = require('react')


var Person = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    var personId = this.context.router.getCurrentParams().personId;
    return <div>PERSON{ personId }</div>;
  }
});


module.exports = Person;
