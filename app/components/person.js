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
        <B.Row>
          <B.Col md={2}>
            <img src={p.avatar} className="img-circle" alt={p.name + ' avatar'} title={p.name} />
          </B.Col>
          <B.Col md={10}>
            <B.PageHeader>{p.name}</B.PageHeader>
            <h2>Lorem ipsum</h2>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <hr />
            <h2>Lorem ipsum</h2>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <hr />
            <h2>Lorem ipsum</h2>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <hr />
          </B.Col>
        </B.Row>

      </div>
    );
  }
});


module.exports = Person;
