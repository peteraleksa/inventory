/**
* Module dependencies.
*/
var should = require('should'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Order = mongoose.model('Order');

//Globals
var user;
var order;

//The Tests
describe('<Unit Test>', function() {
	describe('Model Order:', function() {
		beforeEach(function(done) {
			user = new User({
				name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
			});

			user.save(function(err) {
				order = new Order({
					store: 'Norberts Test Store',
					items: [
                    	{
                    		product: 'Pepperoni',
                    		qty: '7',
                    		lastChecked: new Date(),
							supplier: 'Meats and stuff',
	   						SKU: 5768575,
	   						price: 5.00,
	   						needsReorder: true,
	   						lastOrdered: new Date()
                    	},
                    	{
	                    	product: 'Fresh Mozarella',
                    		qty: '3',
                    		lastChecked: new Date(),
							supplier: 'The Cheese Wiz',
	   						SKU: 576777,
	   						price: 3.00,
	   						needsReorder: true,
	   						lastOrdered: new Date()
                    	}
                    ]
				});

				done();
			});
		});

		describe('Method Save', function() {
			it('should be able to save without problems', function(done) {
				return order.save(function(err) {
					should.not.exist(err);
					done();
				});
			});
		});

		describe('Method Statics Load', function() {
			it('should be able to load without problems', function(done) {
				return Order.load(order._id, function(err) {
					should.not.exist(err);
					done();
				});
			});
		});

		afterEach(function(done) {
			Order.remove({});
			User.remove({});
			done();
		});
		after(function(done){
			Order.remove().exec();
			User.remove().exec();
			done();
		});
	});
});