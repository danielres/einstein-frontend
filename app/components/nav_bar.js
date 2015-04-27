'use strict';

var React = require('react')

var B  = require('react-bootstrap')
var RB = require('react-router-bootstrap')


module.exports = React.createClass({
  render: function() {
    return(
      <B.Navbar toggleNavKey={0}>
        <B.CollapsableNav eventKey={0}>
          <B.Nav navbar>
            <RB.NavItemLink key={1} to="dashboard">Dashboard</RB.NavItemLink>
            <RB.NavItemLink key={3} to="groups">My Groups</RB.NavItemLink>
            <RB.NavItemLink key={4} to="fast_news" disabled>Fastnews</RB.NavItemLink>
            <RB.NavItemLink key={5} to="inbox">Inbox</RB.NavItemLink>
            <RB.NavItemLink key={6} to="open_courses" disabled>Open courses</RB.NavItemLink>
            <RB.NavItemLink key={7} to="network" disabled>Network</RB.NavItemLink>
            <RB.NavItemLink key={8} to="uniworld" disabled>Uniworld</RB.NavItemLink>
          </B.Nav>
          <B.Nav navbar right>
            <B.DropdownButton eventKey={3} title={<B.Glyphicon glyph='user' />}>
              <RB.MenuItemLink to="profile"  disabled>My profile</RB.MenuItemLink>
              <RB.MenuItemLink to="settings" disabled>Settings</RB.MenuItemLink>
              <B.MenuItem divider />
              <RB.MenuItemLink to="logout"   disabled>Logout</RB.MenuItemLink>
            </B.DropdownButton>
          </B.Nav>
        </B.CollapsableNav>
      </B.Navbar>
    );
  }
});
