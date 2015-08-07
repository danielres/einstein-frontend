'use strict';

var _ = require('lodash');
var faker = require('faker');


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


function fakePeopleGenerator(amount) {
  return _.times(amount, function (n) {
    return {
      id:     n,
      name:   faker.name.findName(),
      avatar: faker.internet.avatar()
    }
  })
};


function fakeDiscussionsGenerator(amount, discutable_type, discutable_id) {
  return _.times(amount, function (n) {
    return {
      id:      n,
      title:   faker.company.catchPhrase(),
      author:  people[n],
      entries: [
        {
          id:      1,
          author:  people[1],
          body:    faker.lorem.sentences(),
          entries: [
            { id: 11, author: people[6], body: faker.lorem.sentences() }
          ],
        },
        { id: 2, author: people[2], body: faker.lorem.sentences() },
        { id: 3, author: people[3], body: faker.lorem.sentences() },
        { id: 4, author: people[4], body: faker.lorem.sentences() },
        { id: 5, author: people[5], body: faker.lorem.sentences() },
      ],
    }
  })
};


var people = fakePeopleGenerator(50);


var discussions = fakeDiscussionsGenerator(3);


var peopleSets = [
  _.slice(people,  0,  4),
  _.slice(people, 10, 25),
  _.slice(people, 20, 35),
  _.slice(people,  0, 45),
  _.slice(people, 30, 40),
  _.slice(people, 13, 25),
  _.slice(people, 22, 43),
  _.slice(people,  3, 25),
]


var discussionsSets = [
  _.slice(discussions,  0,  4),
  _.slice(discussions, 5, 14),
  _.slice(discussions, 15, 23),
  _.slice(discussions,  23, 24),
  _.slice(discussions, 25, 40),
  _.slice(discussions, 0, 25),
  _.slice(discussions, 26, 34),
  _.slice(discussions,  35, 49),
]


var groupNames = [
  'Political Science Q/A',
  'Computer Science weekly BBQ',
  'Preparing for next semester',
  'Looking for a place to live',
  'Library new arrivals',
  'Study groups',
  'Health habits',
  'Erasmus 2015',
];


module.exports = function(){
  return ({
    people: people,

    groups: _.times(peopleSets.length, function (n) {
      return {
        id:          n,
        name:        groupNames[n],
        description: faker.company.catchPhrase(),
        owner:       peopleSets[n][0],
        members:     peopleSets[n],
        discussions: discussions,
      }
    }),

    discussions: discussions,
  });
}();
