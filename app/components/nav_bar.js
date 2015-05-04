'use strict';

var React = require('react')

var B  = require('react-bootstrap')
var RB = require('react-router-bootstrap')

var ReactIntl         = require('react-intl');
var IntlMixin         = ReactIntl.IntlMixin;
var FormattedMessage  = ReactIntl.FormattedMessage;
var FormattedRelative = ReactIntl.FormattedRelative;


var intlData = {
  locales : ['en-US'],
  messages: {
    dashboard:       'Dashboard',
    groups:          'My groups',
    news:            'Fast_news',
    inbox:           'Inbox',
    open_courses:    'Open_courses',
    network:         'Network',
    uniworld:        'Uniworld',
    profile:         'Profile',
    settings:        'Settings',
    logout:          'Logout'
  }
};

var NavBar = React.createClass({
  mixins: [IntlMixin],

  render: function() {
    return(
      <B.Navbar toggleNavKey={0}>
        <B.CollapsableNav eventKey={0}>
          <B.Nav navbar>
            <RB.NavItemLink key={1} to="dashboard">
              { this.getIntlMessage('dashboard') }
            </RB.NavItemLink>
            <RB.NavItemLink key={3} to="groups">
              { this.getIntlMessage('groups') }
            </RB.NavItemLink>
            <RB.NavItemLink key={4} to="fast_news" disabled>
              { this.getIntlMessage('news') }
            </RB.NavItemLink>
            <RB.NavItemLink key={5} to="inbox">
              { this.getIntlMessage('inbox') }
            </RB.NavItemLink>
            <RB.NavItemLink key={6} to="open_courses" disabled>
              { this.getIntlMessage('open_courses') }
            </RB.NavItemLink>
            <RB.NavItemLink key={7} to="network" disabled>
              { this.getIntlMessage('network') }
            </RB.NavItemLink>
            <RB.NavItemLink key={8} to="uniworld" disabled>
              { this.getIntlMessage('uniworld') }
            </RB.NavItemLink>
          </B.Nav>
          <B.Nav navbar right>
            <B.DropdownButton eventKey={3} title={<B.Glyphicon glyph='user' />}>
              <RB.MenuItemLink to="profile"  disabled>
              { this.getIntlMessage('profile') }
              </RB.MenuItemLink>
              <RB.MenuItemLink to="settings" disabled>
              { this.getIntlMessage('settings') }
              </RB.MenuItemLink>
              <B.MenuItem divider />
              <RB.MenuItemLink to="logout"   disabled>
              { this.getIntlMessage('logout') }
              </RB.MenuItemLink>
            </B.DropdownButton>
          </B.Nav>
        </B.CollapsableNav>
      </B.Navbar>
    );
  }
});


module.exports = React.createClass({
  render: function(){
    return(<NavBar {...intlData} />);
  }
});

