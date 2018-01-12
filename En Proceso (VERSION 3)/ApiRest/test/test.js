process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Todo = require('../models/todo');

let chai = require('chai');
let chaiHttp = require('chai-http');
let index = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('ToDos', () => {
    beforeEach((done) => {
        Todo.remove({}, (err) => { 
           done();         
        });     
    });

  describe('/GET ToDo', () => {
      it('it should GET all the ToDos', (done) => {
            chai.request(index)
            .get('/v1/todo')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});

