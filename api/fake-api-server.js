var jsonServer = require('json-server');
var server     = require('express')();
var faker      = require('./faker.js');
var bodyParser = require('body-parser');


server.use(bodyParser.json());

server.post('/login', function(req, res){
  if(req.body.username || req.headers.authorization){
    res
      .header('Access-Control-Allow-Origin', '*')
      .header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      .header('Access-Control-Allow-Headers', 'Content-Type')
      .status(200)
      .json({
        id:           1,
        email:        'testuser@fake.com',
        created_at:   '2015-04-17T14:43:01.461Z',
        updated_at:   '2015-07-05T12:00:14.648Z',
        access_token: '1:GHX7XT5oJv4KK8Do2Wiq',
        username:     'Test User',
    })
  };
});


server.use(jsonServer.rewriter({
  '/groups/:groupId/discussions':     '/discussions',
  '/groups/:groupId/discussions/:id': '/discussions/:id',
}))

server.use(jsonServer.defaults);
server.use(jsonServer.router(faker));

module.exports = server;


if(require.main === module){
  server.listen(3001, function() { console.log('serving fake api on port 3001')});
}
