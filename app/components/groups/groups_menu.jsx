'use strict';

var React = require('react')
var B    = require('react-bootstrap')
var _    = require('lodash')

var GroupsActions = require('../../actions/groups_actions')


var GroupsMenu = React.createClass({
  render: function() {
    return (
      <div style={{textAlign: 'right', marginBottom: '20' }}>

        <B.ModalTrigger modal={<CreateGroupModal />}>
          <B.Button bsSize=''><B.Glyphicon glyph='plus'   /></B.Button>
        </B.ModalTrigger>
        &nbsp;
        &nbsp;
        <B.ModalTrigger modal={<FindGroupModal />}>
          <B.Button bsSize=''><B.Glyphicon glyph='search' /></B.Button>
        </B.ModalTrigger>
      </div>
    );
  }
});


var FindGroupModal = React.createClass({
    render: function () {
    return (
      <B.Modal {...this.props} animation={true}>
        <div className='modal-body'>
              <B.Input
                type='text'
                placeholder='Find a group'
                addonAfter={<B.Glyphicon glyph='search' />} />
        </div>
        <div className='modal-footer'>
          <B.Button >Close</B.Button>
        </div>
      </B.Modal>
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


var CreateGroupModal = React.createClass({

  getInitialState: function(){
    return { errors: {} };
  },

  handleSubmit: function(e){
    e.preventDefault();
    var params = {
             name: this.refs.name.getValue(),
      description: this.refs.description.getValue()
    };
    GroupsActions.create(params)
    this.handleSubmitResult();
  },

  handleSubmitResult: function(){
    var that = this;
    GroupsActions.create
      .completed
      .listen(function() {
        that.props.onHide();
      })

    GroupsActions.create
      .failed
      .listen(function(errors) {
        that.setState({ errors: errors });
      }).bind(this);
  },

  render: function () {
    return (
      <B.Modal {...this.props}>
        <form className='form-horizontal'onSubmit={this.handleSubmit}>
          <B.Modal.Header closeButton onHide={this.props.onHide}>Create a group </B.Modal.Header>
          <B.Modal.Body>
            <FormErrorsComponent errors={this.state.errors} />
            <B.Input
              type='text'
              label='Name of the group'
              ref='name'
              labelClassName='col-xs-4'
              wrapperClassName='col-xs-7' />
            <B.Input
              type='text'
              label='Description'
              ref='description'
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


module.exports = GroupsMenu;
