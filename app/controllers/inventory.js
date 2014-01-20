/** 
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Inventory = mongoose.model('Inventory'),
    _ = require('underscore');

exports.update = function(req, res) {
     var inventory = req.inventory;
     inventory = _.extend(inventory, req.body);
     inventory.save(function(err) {
	res.jsonp(inventory);
     });
};
