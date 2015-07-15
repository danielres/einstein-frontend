var _ = require("lodash");
var faker = require("faker");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


function fakePeopleGenerator(amount) {
    return _.times(amount, function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar()
            }
        })
};

var people = fakePeopleGenerator(50);

var groups_discussions = [
    [
        { id: 1, title: "General discussion", author: people[0] },
        { id: 2, title: "Organization for next semester", author: people[1] },
        { id: 3, title: "New ideas", author: people[2] }
    ]
];

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

var groupNames = [
    "Political Science Q/A",
    "Computer Science weekly BBQ",
    "Preparing for next semester",
    "Looking for a place to live",
    "Library new arrivals",
    "Study groups",
    "Health habits",
    "Erasmus 2015",
];


module.exports = function(){
    return {
        people: people,
        groups: _.times(peopleSets.length, function (n) {
            return {
                id: n,
                name: groupNames[n],
                description: faker.company.catchPhrase(),
                owner: peopleSets[n][0],
                members: peopleSets[n],
                discussions: groups_discussions[0],
            }
        })

    }
}();
