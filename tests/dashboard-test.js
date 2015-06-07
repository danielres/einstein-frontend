require('./support/testdom')('<html><body></body></html>');

var assert    = require('assert');
var React     = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Dashboard', function() {

  it('Works !', function() {
    var Dashboard = require('../app/components/dashboard.jsx');
    var dashboard = TestUtils.renderIntoDocument( <Dashboard /> );
    assert.equal(dashboard.getDOMNode().textContent, 'DASHBOARD');
  });

});
