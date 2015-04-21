var React = require('react');

// ROUTER
var Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , DefaultRoute = Router.DefaultRoute
  , Route        = Router.Route;

// NAV
var ReactBootstrap = require('react-bootstrap')
  , Nav       = ReactBootstrap.Nav
  , Navbar = ReactBootstrap.Navbar
  , ListGroup = ReactBootstrap.ListGroup;

// GRID
var ReactBootstrap = require('react-bootstrap')
  , Grid = ReactBootstrap.Grid
  , Row  = ReactBootstrap.Row
  , Col  = ReactBootstrap.Col;

// NAV
var ReactRouterBootstrap = require('react-router-bootstrap')
  , NavItemLink       = ReactRouterBootstrap.NavItemLink
  , ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;

// -------------

var App = React.createClass({
  render: function() {
    return (
      <Grid>
        <MainNavBar />
        <RouteHandler />
      </Grid>
    );
  }
});


var MainNavBar = React.createClass({
  render: function() {
    return(
     <Navbar>
      <Nav>
        <NavItemLink key={1} to="dashboard">Dashboard</NavItemLink>
        <NavItemLink key={2} to="inbox">Inbox</NavItemLink>
        <NavItemLink key={3} to="groups">Groups</NavItemLink>
      </Nav>
    </Navbar>
    );
  }
});

var Dashboard = React.createClass({
  render: function() {
    return <div>DASHBOARD</div>;
  }
});

var Groups = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <div>
        { this.context.router.getCurrentParams().groupId && <Group/> || <GroupsList/> }
      </div>
    );
  }
});

var GroupsList = React.createClass({
  render: function() {
    return (
      <div>
        <ListGroupItemLink to="group" params={{groupId: 1}}>Group 1</ListGroupItemLink>
        <ListGroupItemLink to="group" params={{groupId: 2}}>Group 2</ListGroupItemLink>
        <ListGroupItemLink to="group" params={{groupId: 3}}>Group 3</ListGroupItemLink>
        <ListGroupItemLink to="group" params={{groupId: 4}}>Group 4</ListGroupItemLink>
      </div>
    );
  }
});

var Group = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <Row>
        <Col md={8}>
          <h1>Group {this.context.router.getCurrentParams().groupId}</h1>
          <p>(Details)</p>
        </Col>
        <Col md={4}><GroupsList /></Col>
      </Row>

    );
  }
});

var Inbox = React.createClass({
  render: function() {
    return <div>INBOX</div>;
  }
});

var routes = (
  <Route handler={App} path="/">
    <Route name="dashboard" path="dashboard" handler={Dashboard} />
    <Route name="inbox" path="inbox" handler={Inbox} />
    <Route name="groups" path="groups" handler={Groups}>
      <Route name="group" path="/group/:groupId" handler={Group} />
    </Route>
    <DefaultRoute handler={Dashboard} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

