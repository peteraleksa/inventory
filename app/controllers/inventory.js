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

var checkReorder = function(checkinventory) {
	console.log(checkinventory);
	for(var i=0; i < checkinventory.items.length; i++) {
		if(!(checkinventory.items[i].qty > 
			checkinventory.items[i].reorderLimit)) {
				console.log("Reorder " + checkinventory.items[i].product);
		}
		else {
			console.log("No need to reorder " + checkinventory.items[i].product);
		}
	}
};

exports.update = function(req, res) {
     var inventory = req.inventory;
     inventory = _.extend(inventory, req.body);
     inventory.save(function(err) {
     	checkReorder(inventory);
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

	var inventory;
	var stores = [];

	// if inserting item into all stores
	if(selectedStore == "all") {
		Inventory.find().exec(function(err, inventory) {
	        if (err) {
	            res.render('error', {
	                status: 500
	            });
	        } else {
	        	//console.log(inventory);
	            for(var i=0; i < inventory.length; i++) {
	            	var currentinventory = inventory[i];
	            	console.log(currentinventory);
					currentinventory.updated = new Date();
					currentinventory.items.push(
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

					currentinventory.save(function(err) {

					});
	            }
	            res.json(inventory);
	        }
	        //console.log("Stores: " + stores);
	    });
		
	// else if a single store selected
	} else {

		stores.push(Inventory.loadByStoreName(selectedStore, function(err, inventory) {
			if (err) {
	            res.render('error', {
	                status: 500
	            });
	        } else {
	        	console.log(inventory);
	        	var currentinventory = inventory;
				currentinventory.updated = new Date();
				currentinventory.items.push(
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

				currentinventory.save(function(err) {
					//res.json(currentinventory);
				});

				res.jsonp(inventory);
	        }
		}));
	}
};


