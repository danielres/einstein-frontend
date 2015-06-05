var jsonServer = require('json-server');
var faker      = require('./faker.js');

var server = jsonServer.create();
var router = jsonServer.router(faker);

server.use(jsonServer.defaults);
server.use(router);

module.exports = server;

server.listen(3000, function() { console.log('serving fake api on port 3000')});
