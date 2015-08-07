var login = require('./support/login-helper.js');

var random_group_name        = 'Group '       + Math.random();
var random_group_description = 'Description ' + Math.random();
var random_discussion_title  = 'Title '       + Math.random();


module.exports = {
  before: login,


  'Adding a group': function (browser) {
    browser
      .url('http://127.0.0.1:8080/#/groups')
      .click('[data-ref=adding-a-group-button]')
      .sendKeys('[data-ref=adding-a-group-input-name]', random_group_name)
      .sendKeys('[data-ref=adding-a-group-input-description]', random_group_description)
      .click('button[type=submit]');
  },


  'Viewing groups: viewing the added group in groups list': function(browser){
    browser.pause(200);

    browser
      .expect
      .element('[data-ref=groups-list]').text
      .to.contain(random_group_name);

    browser
      .expect
      .element('[data-ref=groups-list]').text
      .to.contain(random_group_description);
  },


  'Selecting first group in groups list': function(browser){
    browser
      .click('[data-ref=groups-list] a:first-child')
  },


  'Adding a discussion to the selected group': function(browser){
    browser
      .click('[data-ref=adding-a-discussion-button]')
      .sendKeys('[data-ref=adding-a-discussion-input-title]', random_discussion_title)
      .click('button[type=submit]')
  },


  'Viewing group discussions: viewing the added discussion in the group discussions list': function(browser){
    browser
      .pause(500)
      .expect
      .element('[data-ref=discussions-list]').text
      .to.contain(random_discussion_title);
  },

  'Selecting the discussion in discussions list': function(browser){
    browser
      .click('xpath', "//*[text()='" + random_discussion_title + "']")
      .end();
  },


};
