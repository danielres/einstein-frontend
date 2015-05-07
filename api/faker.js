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
    "Study practice 1",
    "Study practice 2",
    "Study practice 3",
    "Study practice 4",
    "Study practice 5",
    "Study practice 6",
    "Study practice 7",
    "Study practice 8",
];


module.exports = function(){
    return {
        people: people,
        groups: _.times(peopleSets.length, function (n) {
            return {
                id: n,
                name: groupNames[n],
                members: peopleSets[n]
            }
        })

    }
}
