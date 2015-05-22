'use strict';

var React = require('react')
var Reflux = require('reflux')

var PersonActions = require('../actions/person_actions')
var PersonStore   = require('../stores/person_store')

var Meta   = require('./meta')

var B  = require('react-bootstrap')

var faker = require("faker");

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
          <B.Col md={3}>
            <p className="text-center">
              <img src={p.avatar} className="img-circle" alt={p.name + ' avatar'} title={p.name} />
            </p>
            <br />
            <B.ListGroup>
              <B.ListGroupItem href='#'><B.Glyphicon glyph="star-empty" /> Follow</B.ListGroupItem>
              <B.ListGroupItem href='#'><B.Glyphicon glyph="comment" />  Private message</B.ListGroupItem>
            </B.ListGroup>
          </B.Col>
          <B.Col md={9}>
            <B.PageHeader>{p.name}</B.PageHeader>
            { [1, 2, 3, 4, 5].map(function(i){
              return (
                <Publication />
              )
            })}
          </B.Col>
        </B.Row>

      </div>
    );
  }
});

var Publication = React.createClass({
  render: function() {
    var content = faker.lorem.sentences(faker.random.number({min: 1, max: 8}));
    return(
      <div>
        { content }
        <Meta follow reply repost />
      <hr />
      </div>
    );
  }
});


module.exports = Person;
