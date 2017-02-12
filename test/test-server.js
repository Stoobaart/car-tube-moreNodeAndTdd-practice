var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = require('chai').expect;

chai.use(chaiHttp);

describe('API routes for the cars resource', function() {

  it('should list ALL cars on / GET', function(done) {
    var request = chai.request(app);
    request
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/ALL CARS/);
        res.text.should.match(/Ford Mustang/);
        done();
      });
  });

  it('should list a SINGLE post on /<id> GET', function(done) {
    chai.request(app)
      .get('/589de1623eaf33774807a704')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/Mini One/);
        done();
      });
  });

  it('should add a SINGLE post on / POST' , function(done){
      var request = chai.request(app);
      request.post('/')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            name: "BMW X6",
            price: 129999.99,
            condition: "New",
            year: 2017,
            body: "Really, who knows at this point",
            color: "Green, the color of dolla"
          })
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.html;
            res.text.should.match(/ALL CARS/);
            request
              .get('/5')
              .end(function(err, res){
                  res.should.have.status(200);
                  res.should.be.html;
                  res.text.should.match(/BMW X6/);
                  res.text.should.match(/Green, the color of dolla/);
                  done();
              });
          });
  });

  it('should update a SINGLE post on /<id> PUT' , function(done){
    var request = chai.request(app);
    request.put('/0')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          id: 0,
          name: "Aston Martin DB7",
          price: 29999.99,
          condition: "Used",
          year: 2005,
          body: "Coupe",
          color: "Bond Silver"
        })
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.html;
          res.text.should.match(/ALL CARS/);
          request
            .get('/0')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Bond Silver/);
                done();
            });
        });
  });


  it('should delete a SINGLE post on /<id> DELETE' , function(done) {
    var request = chai.request(app);
    request.delete('/5')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.html;
          res.text.should.match(/ALL CARS/);
          request
            .get('/5')
            .end(function(err, res){
                res.should.have.status(404);
                done();
            });
        });
  });
});
