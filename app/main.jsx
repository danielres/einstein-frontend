'use strict';

var React = require('react')

var B     = require('react-bootstrap')

var Router       = require('react-router')
  , RouteHandler = Router.RouteHandler
  , DefaultRoute = Router.DefaultRoute
  , Route        = Router.Route

var UserBox     = require('./components/user_box')
var NavBar      = require('./components/nav_bar')
var Dashboard   = require('./components/dashboard')
var Placeholder = require('./components/placeholder')
var Inbox       = require('./components/inbox')
var Groups      = require('./components/groups')
var Person      = require('./components/person')


var App = React.createClass({
  render: function() {
    return (
      <B.Grid>
        <B.Row>
          <B.Col><NavBar /></B.Col>
        </B.Row>
        <B.Row>
          <UserBox />
          <B.Col><RouteHandler /></B.Col>
        </B.Row>
      </B.Grid>
    );
  }
});


var routes = (
  <Route handler={App} path="/">
    <DefaultRoute              handler={Dashboard} />
    <Route name="dashboard"    handler={Dashboard}    path="dashboard" />
    <Route name="inbox"        handler={Inbox}        path="inbox" />
    <Route name="groups"       handler={Groups}       path="groups">
      <Route name="group"      handler={Groups.Group} path=":groupId" />
    </Route>
    <Route name="fast_news"    handler={Placeholder}  path="fast_news" />
    <Route name="open_courses" handler={Placeholder}  path="open_courses" />
    <Route name="network"      handler={Placeholder}  path="network" />
    <Route name="uniworld"     handler={Placeholder}  path="uniworld" />
    <Route name="profile"      handler={Placeholder}  path="profile" />
    <Route name="settings"     handler={Placeholder}  path="settings" />
    <Route name="logout"       handler={Placeholder}  path="logout" />
    <Route name="person"       handler={Person}       path="/people/:personId" />
  </Route>
);


module.exports = Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
