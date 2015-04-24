module.exports = function(){
    var faker = require("faker");
    var _ = require("lodash");
    return {
        people: _.times(100, function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar()
            }
        }),
        groups: _.times(8, function (n) {
            var i = n + 1
            return {
                id: i,
                name: "Group number" + i
            }
        })

    }
}
