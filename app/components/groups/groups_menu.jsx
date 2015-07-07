'use strict';

var React = require('react')
var B    = require('react-bootstrap')


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
  },

  render: function () {
    return (
      <B.Modal {...this.props} bsStyle='' animation={true}>
        <form className='form-horizontal'onSubmit={this.handleSubmit}>

          <div className="modal-header">
            <button className="close" aria-label="Close" style={{marginTop: '-2'}}>
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title">Create a group</h4>
          </div>

          <div className='modal-body'>
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
          </div>

          <div className='modal-footer'>
            <B.Button type="submit">Submit</B.Button>
            <B.Button >Close</B.Button>
          </div>
        </form>
      </B.Modal>
    );
  }
});


module.exports = GroupsMenu;
