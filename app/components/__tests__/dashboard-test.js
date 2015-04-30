jest.dontMock('../dashboard.js');

describe('dashboard', function() {
 it('works', function() {
    var React = require('react/addons');
    var Dashboard = require('../dashboard');
    var TestUtils = React.addons.TestUtils;

    var dashboard = TestUtils.renderIntoDocument(
      <Dashboard />
    );

    var content = TestUtils.findRenderedDOMComponentWithTag(dashboard, 'div');

    expect(content.getDOMNode().textContent).toEqual('DASHBOARD');

 });
});
