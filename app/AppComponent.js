var React = require('react');
var Reflux = require('reflux');

// ROUTER
var Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , DefaultRoute = Router.DefaultRoute
  , Route        = Router.Route;

// NAV
var ReactBootstrap = require('react-bootstrap')
  , Nav       = ReactBootstrap.Nav
  , Navbar = ReactBootstrap.Navbar
  , CollapsableNav = ReactBootstrap.CollapsableNav
  , ListGroup = ReactBootstrap.ListGroup;

// GRID
var ReactBootstrap = require('react-bootstrap')
  , Grid = ReactBootstrap.Grid
  , Row  = ReactBootstrap.Row
  , Col  = ReactBootstrap.Col;

// MISC
var ReactBootstrap = require('react-bootstrap')
  , Glyphicon  = ReactBootstrap.Glyphicon
  , PageHeader = ReactBootstrap.PageHeader
  , Button     = ReactBootstrap.Button
  , DropdownButton     = ReactBootstrap.DropdownButton
  , MenuItem    = ReactBootstrap.MenuItem;

// NAV
var ReactRouterBootstrap = require('react-router-bootstrap')
  , NavItemLink       = ReactRouterBootstrap.NavItemLink
  , MenuItemLink     = ReactRouterBootstrap.MenuItemLink
  , ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;

// GROUPS
var GroupsActions = require('./groups_actions');
var GroupsStore   = require('./groups_store');


// -------------

var App = React.createClass({
  render: function() {
    return (
      <Grid>
        <Row><Col><MainNavBar /></Col></Row>
        <Row><Col><RouteHandler /></Col></Row>
      </Grid>
    );
  }
});


var MainNavBar = React.createClass({
  render: function() {
    return(
      <Navbar toggleNavKey={0}>
        <CollapsableNav eventKey={0}>
          <Nav navbar>
            <NavItemLink key={1} to="dashboard">Dashboard</NavItemLink>
            <NavItemLink key={3} to="groups">My Groups</NavItemLink>
            <NavItemLink key={4} to="fast_news" disabled>Fastnews</NavItemLink>
            <NavItemLink key={5} to="inbox">Inbox</NavItemLink>
            <NavItemLink key={6} to="open_courses" disabled>Open courses</NavItemLink>
            <NavItemLink key={7} to="network" disabled>Network</NavItemLink>
            <NavItemLink key={8} to="uniworld" disabled>Uniworld</NavItemLink>
          </Nav>
          <Nav navbar right>
            <DropdownButton eventKey={3} title={<Glyphicon glyph='user' />}>
              <MenuItemLink to="profile" disabled>My profile</MenuItemLink>
              <MenuItemLink to="settings" disabled>Settings</MenuItemLink>
              <MenuItem divider />
              <MenuItemLink to="logout" disabled>Logout</MenuItemLink>
            </DropdownButton>
          </Nav>
        </CollapsableNav>
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
    mixins: [Reflux.connect(GroupsStore, "list")],
    componentDidMount: function () {
        GroupsActions.load();
    },
    render: function () {
        var groups = this.state.list;
        return (
            <div>
              { groups.map(function(group){
                var headerText = "Group " + group.id;
                return <ListGroupItemLink to="group" params={{groupId: group.id}} header={headerText}>description</ListGroupItemLink>
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
    return(<div>IN  CONSTRUCTION</div>);
  }
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute              handler={Dashboard} />
    <Route name="dashboard"    handler={Dashboard}    path="dashboard" />
    <Route name="inbox"        handler={Inbox}        path="inbox" />
    <Route name="groups"       handler={Groups}       path="groups">
      <Route name="group"      handler={Group}        path=":groupId" />
    </Route>
    <Route name="fast_news"    handler={Placeholder}  path="fast_news" />
    <Route name="open_courses" handler={Placeholder}  path="open_courses" />
    <Route name="network"      handler={Placeholder}  path="network" />
    <Route name="uniworld"     handler={Placeholder}  path="uniworld" />
    <Route name="profile"      handler={Placeholder}  path="profile" />
    <Route name="settings"     handler={Placeholder}  path="settings" />
    <Route name="logout"       handler={Placeholder}  path="logout" />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

