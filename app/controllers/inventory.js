/** 
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Inventory = mongoose.model('Inventory'),
    _ = require('underscore');

/**
 * Find inventory by id
 */
exports.inventory = function(req, res, next, id) {
    Inventory.load(id, function(err, inventory) {
        if (err) return next(err);
        if (!inventory) return next(new Error('Failed to load inventory ' + id));
        req.inventory = inventory;
        next();
    });
};

exports.create = function(req, res, next) {
    var inventory = new Inventory(req.body);

    inventory.save(function(err) {
	    if (err) {
	        console.log("exports create called - error");
	        return res.send('users/signup', {
	            errors: err.errors,
	            inventory: inventory
	        });
	    } else {
	        console.log("exports create called - ok");
	        res.jsonp(inventory);
	    }
	});
    
};

exports.update = function(req, res) {
     var inventory = req.inventory;
     inventory = _.extend(inventory, req.body);
     inventory.save(function(err) {
		res.jsonp(inventory);
     });
};

exports.all = function(req, res) {
    Inventory.find().exec(function(err, inventory) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(inventory);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.inventory);
};

exports.addItem = function(req, res) {
	var inventory = Inventory.loadByStoreName("Norberts I", function(err, inventory) {
		var product = req.body.product;
		var qty = req.body.qty;
		var supplier = req.body.supplier;
		var sku = req.body.sku;
		var price = req.body.price;
		var lastOrdered = req.body.lastOrdered;

		console.log(product);
		console.log(qty);
		console.log(supplier);
		console.log(sku);
		console.log(price);
		console.log(lastOrdered);

		inventory.updated = new Date();
		inventory.items.push({'product': product, 'qty': qty, 'supplier': supplier, 'sku': sku, 'price': price, 'lastOrdered': lastOrdered });

		inventory.save(function(err) {
			console.log(inventory);
			res.json(inventory);
		});
	});
	
};


