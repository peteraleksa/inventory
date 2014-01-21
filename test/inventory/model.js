/**
* Attempted to make some tests, but they are incomplete
*/

/**
* Module dependencies.
*/
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    Inventory = mongoose.model('Inventory');

//Globals
var user;
var Inventory;

//The tests
describe('<Unit Test>', function() {
    describe('Model Inventory:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                Inventory = new Inventory({
                    title: 'Inventory Title',
                    composer: 'Composer',
                    year: '2013',
                    runnerRange: ['Pro Men', 'Pro Women'],
                    timingLocations: {
                        locations: ['Start', 'Mile 1', 'Mile 2']
                    },
                    melody: {
                        melodyType: 'Harmonic'
                    },
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return Inventory.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when trying to save without title', function(done) {
                Inventory.title = '';

                return Inventory.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when trying to save without composer', function(done) {
                Inventory.composer = '';

                return Inventory.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

/* 
 * hmmm, is this even necessary??
 *
        describe('Method Statics Load', function() {
            it('should be able to load without problems', function(done) {
                return Inventory.statics.load(Inventory._id, function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });
*/

        afterEach(function(done) {
            Inventory.remove({});
            User.remove({});
            done();
        });
        after(function(done){
            Inventory.remove().exec();
            User.remove().exec();
            done();
        });
    });
});