'use strict';

var React = require('react')
var B    = require('react-bootstrap')
var _    = require('lodash')

var DiscussionsActions = require('../../actions/discussions_actions')
var DiscussionsStore   = require('../../stores/discussions_store')


var DiscussionsMenu = React.createClass({
  render: function() {
    return (
      <div style={{ marginBottom: '20' }}>
        <B.ModalTrigger modal={<CreateDiscussionModal discutable_id={this.props.discutable_id} discutable_type={this.props.discutable_type} />}>
          <B.Button bsSize='small'><B.Glyphicon glyph='plus' bsSize='small' /></B.Button>
        </B.ModalTrigger>
      </div>
    );
  }
});


var FormErrorsComponent = React.createClass({
  render: function () {
    var errors = _.map(
      this.props.errors, function(messages,key){
        return  <div>
                  <strong>{_.capitalize(key)}:</strong>
                  <ul>
                    {
                      _.map(messages, function(m){
                        return <li>{m}</li>
                      })
                    }
                  </ul>
                </div>
      }
    );
    return (
        <div>{ _.size(this.props.errors) != 0 && <B.Alert bsStyle='warning'>{errors}</B.Alert> }</div>
    );
  }
});


var CreateDiscussionModal = React.createClass({

  getInitialState: function(){
    return { errors: {} };
  },

  handleSubmit: function(e){
    e.preventDefault();
    var params = {
      title: this.refs.title.getValue(),
      discutable_type: this.props.discutable_type,
      discutable_id: this.props.discutable_id
    };
    DiscussionsActions.create(params);

    this.handleSubmitResult();
  },

  handleSubmitResult: function(){
    var that = this;
    DiscussionsActions.create
      .completed
      .listen(function() {
        that.props.onHide();
      })

    DiscussionsActions.create
      .failed
      .listen(function(errors) {
        that.setState({ errors: errors });
      }).bind(this);
  },

  render: function () {
    return (
      <B.Modal {...this.props}>
        <form className='form-horizontal'onSubmit={this.handleSubmit}>
          <B.Modal.Header closeButton onHide={this.props.onHide}>Create a discussion</B.Modal.Header>
          <B.Modal.Body>
            <FormErrorsComponent errors={this.state.errors} />
            <B.Input
              type='text'
              label='Title of the discussion'
              ref='title'
              labelClassName='col-xs-4'
              wrapperClassName='col-xs-7' />
          </B.Modal.Body>
          <B.Modal.Footer>
            <B.Button type="submit">Submit</B.Button>
          </B.Modal.Footer>
        </form>
      </B.Modal>
    );
  }
});


module.exports = DiscussionsMenu;
