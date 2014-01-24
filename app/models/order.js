/** 
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Inventory Schema
 */
 var OrderSchema = new Schema({
 	store: {
 		type: String
 	},
 	date: {
 		type: Date
 	},
 	needsAttention: {
 		type: Boolean
 	},
 	items: [{
	   product: {
	      type: String
	   },
	   qty: {
	      type: Number
	   },
	   lastChecked: {
	      type: Date
	   },
	   supplier: {
	      type: String
	   },
	   SKU: {
	      type: Number
	   },
	   price: {
	      type: Number
	   },
	   reorderLimit: {
	   	type: Number
	   },
	   needsReorder: {
	   	type: Boolean
	   },
	   lastOrdered: {
	      type: Date
  	   }	
	}]

});

/**
 * Statics
*/
OrderSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Order', OrderSchema);