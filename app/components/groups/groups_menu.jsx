'use strict';

var React = require('react')
var B    = require('react-bootstrap')

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


var CreateGroupModal = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var params = {
             name: this.refs.name.getValue(),
      description: this.refs.description.getValue()
    };
    GroupsActions.create(params);
  },

  render: function () {
    return (
      <B.Modal {...this.props}>
        <form className='form-horizontal'onSubmit={this.handleSubmit}>
          <B.Modal.Header closeButton onHide={this.props.onHide}>Create a group </B.Modal.Header>
          <B.Modal.Body>
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
            <B.Button onClick={this.props.onHide}>Close</B.Button>
          </B.Modal.Footer>
        </form>
      </B.Modal>
    );
  }
});


module.exports = GroupsMenu;
