'use strict';

var React = require('react');
var B     = require('react-bootstrap');
var _     = require('lodash');

var DiscussionsActions = require('actions/discussions_actions');
var DiscussionsStore   = require('stores/discussions_store');


var DiscussionsMenu = React.createClass({
  displayName: 'DiscussionsMenu',

  render: function() {
    return (
      <div style={{ marginBottom: '20' }}>
        <CreateDiscussionModal
          discutable_id={this.props.discutable_id}
          discutable_type={this.props.discutable_type}
        />
      </div>
    );
  }
});


var FormErrorsComponent = React.createClass({
  displayName: 'FormErrorsComponent',

  render: function () {
    var errors = _.map(
      this.props.errors, function(messages,key){
        return (
          <div>
            <strong>{_.capitalize(key)}:</strong>
            <ul>
              {
                _.map(messages, function(m){
                  return <li>{m}</li>
                })
              }
            </ul>
          </div>
        );
      }
    );
    return (
        <div>
          {
            _.size(this.props.errors) != 0 &&
            <B.Alert bsStyle='warning'>{errors}</B.Alert>
          }
        </div>
    );
  }
});


var CreateDiscussionModal = React.createClass({
  displayName: 'CreateDiscussionModal',

  getInitialState: function(){
    return ({
      errors:    {},
      showModal: false,
    });
  },

  close: function(){
    this.setState({ showModal: false });
  },

  open: function(){
    this.setState({ showModal: true });
  },

  handleSubmit: function(e){
    e.preventDefault();
    var params = {
      title:           this.refs.title.getValue(),
      discutable_type: this.props.discutable_type,
      discutable_id:   this.props.discutable_id,
    };
    DiscussionsActions.create(params);

    this.handleSubmitResult();
  },

  handleSubmitResult: function(){
    var that = this;
    DiscussionsActions.create
      .completed
      .listen(function() {
        that.close();
      })

    DiscussionsActions.create
      .failed
      .listen(function(errors) {
        that.setState({ errors: errors });
      });
  },

  render: function () {
    return (
      <div>
        <B.Button bsSize='small' onClick={this.open} >
          <B.Glyphicon
            bsSize='small'
            glyph='plus'
          />
        </B.Button>

        <B.Modal
          onHide={this.close}
          show={this.state.showModal}
        >
          <form
            className='form-horizontal'
            onSubmit={this.handleSubmit}
          >
            <B.Modal.Header
              closeButton
              onHide={this.close}
            >
              <B.Modal.Title>Create a discussion</B.Modal.Title>
            </B.Modal.Header>
            <B.Modal.Body>
              <FormErrorsComponent errors={this.state.errors} />
              <B.Input
                label='Title of the discussion'
                labelClassName='col-xs-4'
                ref='title'
                type='text'
                wrapperClassName='col-xs-7'
              />
            </B.Modal.Body>
            <B.Modal.Footer>
              <B.Button type="submit">Submit</B.Button>
            </B.Modal.Footer>
          </form>
        </B.Modal>
      </div>
    );
  }
});


module.exports = DiscussionsMenu;
