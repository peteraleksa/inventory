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
var inventory;

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
                inventory = new Inventory({
                    store: 'Norberts Test Store',
                    updated: new Date(),
                    items: [
                    	{
                    		product: 'Pepperoni',
                    		qty: '7',
                    		lastChecked: new Date(),
							supplier: 'Meats and stuff',
	   						SKU: 5768575,
	   						price: 5.00,
	   						lastOrdered: new Date()
                    	},
                    	{
	                    	product: 'Fresh Mozarella',
                    		qty: '3',
                    		lastChecked: new Date(),
							supplier: 'The Cheese Wiz',
	   						SKU: 576777,
	   						price: 3.00,
	   						lastOrdered: new Date()
                    	}
                    ]
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return inventory.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });

        describe('Method Statics Load', function() {
            it('should be able to load without problems', function(done) {
                return Inventory.load(inventory._id, function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });

        describe('Method Statics Load By Store Name', function() {
            it('should be able to load by store name without problems', function(done) {
                return Inventory.loadByStoreName(inventory.store, function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });

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