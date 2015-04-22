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

// MISC
var ReactBootstrap = require('react-bootstrap')
  , PageHeader = ReactBootstrap.PageHeader;

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
    var groupId = this.context.router.getCurrentParams().groupId;
    return (
      <Row>
        <Col md={8}>
          { groupId && <Group groupId={groupId} /> || "SOME INFO" }
        </Col>
        <Col md={4}>
          <GroupsList />
        </Col>
      </Row>
    );
  }
});

var GroupsList = React.createClass({
  render: function() {
    var groupIds = [1,2,3,4,5,6,7,8];
    return (
      <div>
        { groupIds.map(function(groupId){
          var headerText = "Group " + groupId;
          return <ListGroupItemLink to="group" params={{groupId: groupId}} header={headerText}>description</ListGroupItemLink>
        })}
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
      <div>
        <PageHeader>Group {this.props.groupId} <small>description</small></PageHeader>
        <p>(Details)</p>
      </div>
    );
  }
});

var Inbox = React.createClass({
  render: function() {
    return <div>INBOX</div>;
  }
});

var Placeholder = React.createClass({
  render: function() {
    return <div>IN  CONSTRUCTION</div>;
  }
});

var routes = (
  <Route handler={App} path="/">
    <Route name="dashboard" path="dashboard" handler={Dashboard} />
    <Route name="inbox" path="inbox" handler={Inbox} />
    <Route name="placeholder" path="placeholder" handler={Placeholder} />
    <Route name="groups" path="groups" handler={Groups}>
      <Route name="group" path="/group/:groupId" handler={Group} />
    </Route>
    <DefaultRoute handler={Dashboard} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

