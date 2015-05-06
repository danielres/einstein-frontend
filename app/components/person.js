'use strict';

var React = require('react')
var Reflux = require('reflux')

var PersonActions = require('./person/actions')
var PersonStore   = require('./person/store')

var B  = require('react-bootstrap')

var Person = React.createClass({
  mixins: [Reflux.connect(PersonStore, "item")],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function () {
    var personId = this.context.router.getCurrentParams().personId;
    PersonActions.load(personId);
  },
  render: function() {
    var p = this.state.item;
    return(
      <div>
        <B.PageHeader>{p.name} <small>description</small></B.PageHeader>
        <div>
          <img src={p.avatar} className="img-circle" alt={p.name + ' avatar'} title={p.name} />
        </div>
      </div>
    );
  }
});


module.exports = Person;
