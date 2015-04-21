var React = require('react');

var Grid = require('react-bootstrap').Grid;
var Row  = require('react-bootstrap').Row;
var Col  = require('react-bootstrap').Col;

var Nav = require('./NavComponent.js');


module.exports = React.createClass({
  render: function(){
    return(
      <Grid>
        <Row><Nav/></Row>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            Main content
          </Col>
          <Col xs={6} md={4}>
            Secondary content
          </Col>
        </Row>
      </Grid>
    );
  }
});
