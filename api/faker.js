var _ = require("lodash");
var faker = require("faker");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function fakePeople(amount) {
    return _.times(amount, function (n) {
                    return {
                        id: n,
                        name: faker.name.findName(),
                        avatar: faker.internet.avatar()
                    }
                })
};

module.exports = function(){
    return {
        people: _.times(100, function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar()
            }
        }),
        groups: _.times(8, function (n) {
            return {
                id: n,
                name: "Group number " + (n + 1),
                members: fakePeople(getRandomInt(3,23))
            }
        })

    }
}
