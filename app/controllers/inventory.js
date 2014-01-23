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

exports.show = function(req, res) {
    res.jsonp(req.inventory);
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

exports.addItem = function(req, res) {

	console.log(req.body);
	var selectedStore = req.body.selectedStore;
	console.log(selectedStore);

	var stores = [];
	var inventory;

	if(selectedStore == "all") {
		stores.push("Norberts I");
		stores.push("Norberts II"); 
	} else {
		stores.push(selectedStore);
	}

	for(var i=0; i < stores.length; i++) {
		console.log(stores[i]);
		inventory = Inventory.loadByStoreName(stores[i], function(err, inventory) {
			inventory.updated = new Date();
			inventory.items.push(
				{
					'product': req.body.product, 
					'qty': req.body.qty, 
					'supplier': req.body.supplier, 
					'sku': req.body.sku, 
					'price': req.body.price, 
					'reorderLimit': req.body.reorderLimit, 
					'lastOrdered': req.body.lastOrdered 
				}
			);

			inventory.save(function(err) {
				//res.json(inventory);
			});
		});
	}

	next();
};


