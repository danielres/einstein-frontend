var React = require('react');

var Navbar         = require('react-bootstrap').Navbar;
var Nav            = require('react-bootstrap').Nav;
var NavItem        = require('react-bootstrap').NavItem;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem       = require('react-bootstrap').MenuItem;

module.exports = React.createClass({
  render: function(){
    return(
     <Navbar>
      <Nav>
        <NavItem key={1} href="#">Home</NavItem>
        <DropdownButton key={3} title="My groups">
          <MenuItem key="1">Group 1</MenuItem>
          <MenuItem key="2">Group 2</MenuItem>
          <MenuItem key="3">Group 3</MenuItem>
          <MenuItem divider />
          <MenuItem key="4">Group 4</MenuItem>
        </DropdownButton>
      </Nav>
    </Navbar>
    );
  }
});



