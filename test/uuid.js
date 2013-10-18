var should = require("should");
var Adapter = require('../index');

var config = {
    uuid : true //Use UUID's for missing id's
};

var fixture = {
  first_name: { type: 'string' },
  last_name: { type: 'string' },
  email: { type: 'string' },
  id:{ type: 'string' },
  createdAt: { type: 'DATE', default: 'NOW' },
  updatedAt: { type: 'DATE', default: 'NOW' }
};

describe('UUID', function() {
    var User;
    var Schema;

    before(function(done) {
       Adapter.registerCollection({ identity: 'user', config: config }, function(err) {
          if(err) done(err);

          // Define The Collection
          Adapter.define('user', fixture, function(err, schema) {
            if(err) return done(err);
            Schema = schema;
            done();
          });
        });
    });

    describe('.create()', function() {
        it('should create a new record with uuid', function(done) {
          Adapter.create('user', { first_name: 'Foo' }, function(err, record) {
            record.first_name.should.equal('Foo');
            should.exist(record.id);
            done();
          });
        });

        it('should create a new record with set ID', function(done) {
          Adapter.create('user', { first_name: 'Foo', id: 'MYID' }, function(err, record) {
            should.not.exist(err);
            record.first_name.should.equal('Foo');
            record.id.should.equal('MYID');
            done();
          });
        });
    });

});