var login = require('./support/login-helper.js');

module.exports = {
  before: login,

  'Groups': function (browser) {
    browser
      .url('http://127.0.0.1:8080/#/groups')
      .waitForElementVisible('.page-header', 1000)
    browser.expect.element('h1').text.to.contain('My groups');
    browser.end();
  }
};
