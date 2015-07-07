'use strict';

var React = require('react')

var B  = require('react-bootstrap')
var RB = require('react-router-bootstrap')

var Intl              = require('intl')
var ReactIntl         = require('react-intl');
var IntlMixin         = ReactIntl.IntlMixin;
var FormattedMessage  = ReactIntl.FormattedMessage;
var FormattedRelative = ReactIntl.FormattedRelative;

var SessionActions = require('../actions/session_actions');

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
    var user = this.props.user;
    return(
      <B.Navbar toggleNavKey={0}>
        <B.CollapsableNav eventKey={0}>
          <B.Nav navbar>
            <RB.NavItemLink key={1} to="dashboard">
              <FormattedMessage message={ this.getIntlMessage('dashboard') } />
            </RB.NavItemLink>
            <RB.NavItemLink key={3} to="groups">
              <FormattedMessage message={ this.getIntlMessage('groups') } />
            </RB.NavItemLink>
            <RB.NavItemLink key={4} to="fast_news" disabled>
              <FormattedMessage message={ this.getIntlMessage('news') } />
            </RB.NavItemLink>
            <RB.NavItemLink key={5} to="inbox">
              <FormattedMessage message={ this.getIntlMessage('inbox') } />
            </RB.NavItemLink>
            <RB.NavItemLink key={6} to="open_courses" disabled>
              <FormattedMessage message={ this.getIntlMessage('open_courses') } />
            </RB.NavItemLink>
            <RB.NavItemLink key={7} to="network" disabled>
              <FormattedMessage message={ this.getIntlMessage('network') } />
            </RB.NavItemLink>
            <RB.NavItemLink key={8} to="uniworld" disabled>
              <FormattedMessage message={ this.getIntlMessage('uniworld') } />
            </RB.NavItemLink>
          </B.Nav>
          <B.Nav navbar right>
            <B.DropdownButton eventKey={3} title={ <span><B.Glyphicon glyph='user' /> <b>{user.username}</b></span>}>
              <RB.MenuItemLink to="profile"  disabled>
                <FormattedMessage message={ this.getIntlMessage('profile') } />
              </RB.MenuItemLink>
              <RB.MenuItemLink to="settings" disabled>
                <FormattedMessage message={ this.getIntlMessage('settings') } />
              </RB.MenuItemLink>
              <B.MenuItem divider />
              <B.MenuItem onSelect={SessionActions.logout}>
                <FormattedMessage message={ this.getIntlMessage('logout') } />
              </B.MenuItem>
            </B.DropdownButton>
            <B.DropdownButton noCaret eventKey={3} title={<B.Glyphicon glyph='bell'><B.Badge style={{background: "red", position: "absolute", marginTop: "-17px", marginLeft: "-8px", fontSize: '0.7em'}}>15</B.Badge></B.Glyphicon>}>
              { [1, 2, 3, 4, 5, 6, 7, 8].map(function(i){
                return (
                  <RB.MenuItemLink to="dashboard"  disabled>
                    Notification {i}
                    <br/>
                    <small><FormattedMessage message="Notification contents" /></small>
                  </RB.MenuItemLink>
                )
              })}
                <B.MenuItem style={{textAlign: 'right'}}>
                  <B.Glyphicon style={{ margin: "15px 0"}}  glyph='option-horizontal' />
                </B.MenuItem>
            </B.DropdownButton>

          </B.Nav>
        </B.CollapsableNav>
      </B.Navbar>
    );
  }
});


module.exports = React.createClass({
  render: function(){
    return(<NavBar {...intlData} user={this.props.user} />);
  }
});

