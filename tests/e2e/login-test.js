module.exports = {
  'Login': function (browser) {
    browser
      .url('http://127.0.0.1:8080/#/')
      .assert.elementPresent('form')
      .click('input[type=submit]')
      .waitForElementVisible('.navbar', 1000)
      .assert.containsText('.container', 'Dashboard')
      .end();
  }
};
