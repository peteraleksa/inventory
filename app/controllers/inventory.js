/** 
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Inventory = mongoose.model('Inventory'),
    Order = mongoose.model('Order'),
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

var checkReorder = function(item) {
	//console.log(item);
	if(!(item.qty > 
		item.reorderLimit)) {
			console.log("Reorder " + item.product);
			item.needsReorder = true;
	}
	else {
		console.log("No need to reorder " + item.product);
		item.needsReorder = false;
	}
};

exports.update = function(req, res) {
     var inventory = req.inventory;
     inventory = _.extend(inventory, req.body);
     
     var orderPending = false;
     var oldOrder;

     // Create new order tally
     var order = new Order();
     order.store = inventory.store;
     order.date = new Date();
     order.needsAttention = true;
     order.items = [];

     // check to see if store has an order pending already
     Order.find({store: order.store, needsAttention: true}).exec(function(err, storeorders) {
        if (!storeorders) {
        	orderPending = false;
        } else {
        	for(var i=0; i < storeorders.length; i++) {
	        	 storeorders[i].needsAttention = false;
	        	 storeorders[i].save(function(err) {
	        	 	console.log("Store Order: " + storeorders[i]);
				 });
			}
	        orderPending = true;
        }
     });

     // check reorder status of each item and push it on the list
     for(var i=0; i < inventory.items.length; i++) {
     	checkReorder(inventory.items[i]);
     	if(inventory.items[i].needsReorder) {
     		order.items.push(inventory.items[i]);
     	}
     }	

     // save inventory
     inventory.save(function(err) {
		// save order
     	order.save();
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

	var selectedStore = req.body.selectedStore;

	var inventory;
	var stores = [];

	var addToInventory = function(inventory) { 
				console.log(inventory);
				inventory.updated = new Date();
				inventory.items.push(
					{
						'product': req.body.product, 
						'qty': req.body.qty, 
						'supplier': req.body.supplier, 
						'sku': req.body.sku, 
						'price': req.body.price, 
						'reorderLimit': req.body.reorderLimit,
						'needsReorder': false, 
						'lastOrdered': req.body.lastOrdered 
					}
				);
	};

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
	            	addToInventory(inventory[i]);
	            	inventory[i].save(function(err) {
	            	});
	            }
	            res.redirect('/#!/inventory/enter');
	        }
	    });
		
	// else if a single store selected
	} else {
		Inventory.loadByStoreName(selectedStore, function(err, inventory) {
			if (err) {
	            res.render('error', {
	                status: 500
	            });
	        } else {
	        	addToInventory(inventory);
				inventory.save(function(err) {
					res.redirect('/#!/inventory/enter');
				});
	        }
		});
	}
};


