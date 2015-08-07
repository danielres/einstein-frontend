var login = require('./support/login-helper.js');

var random_name        = 'Group '       + Math.random();
var random_description = 'Description ' + Math.random();


module.exports = {
  before: login,

  'Adding a group': function (browser) {

    browser
      .url('http://127.0.0.1:8080/#/groups')
      .click('[data-ref=adding-a-group-button]')
      .sendKeys('[data-ref=adding-a-group-input-name]', random_name)
      .sendKeys('[data-ref=adding-a-group-input-description]', random_description)
      .click('button[type=submit]');
  },

  'Viewing groups': function(browser){
    browser.pause(200);

    browser.expect
           .element('[data-ref=groups-list]')
           .text.to.contain(random_name);

    browser.expect
            .element('[data-ref=groups-list]')
            .text.to.contain(random_description);

    browser.end();
  }

};
