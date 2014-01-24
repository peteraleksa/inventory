/** 
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    _ = require('underscore');

exports.orders = function(req, res) {

	Order.find().exec(function(err, orders) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
        	console.log('Order: ' + orders);
            res.jsonp(orders);
        }
    });

};