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
    render: function () {
    return (
      <B.Modal {...this.props} bsStyle='' animation={true}>
        <div className='modal-body'>
              <B.Input
                type='text'
                placeholder='Create a group'
                addonAfter={<B.Glyphicon glyph='plus' />} />
        </div>
        <div className='modal-footer'>
          <B.Button >Close</B.Button>
        </div>
      </B.Modal>
    );
  }
});

module.exports = GroupsMenu;
