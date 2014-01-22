/**
* Attempted to make some tests, but they are incomplete
*/

/**
* Module dependencies.
*/
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
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
                    store: 'Norberts Test Store',
                    updated: Date.now,
                    items: [
                    	{
                    		product: 'Pepperoni',
                    		qty: '7',
                    		lastChecked: Date.now,
							   supplier: 'Meats and stuff',
	   						SKU: 5768575,
	   						price: 5.00,
	   						lastOrdered: Date.now
                    	},
                    	{
	                    	product: 'Fresh Mozarella',
                    		qty: '3',
                    		lastChecked: Date.now,
							   supplier: 'The Cheese Wiz',
	   						SKU: 576777,
	   						price: 3.00,
	   						lastOrdered: Date.now
                    	}
                    ]
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