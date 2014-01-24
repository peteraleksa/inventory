//service used for inventory REST endpoint
angular.module('inventoryApp.inventory').factory("Inventory", ['$resource', function($resource) {
    var service = $resource('inventory/stores/:storeId', {
            storeId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        }
    );

    return service;

}]);

angular.module('inventoryApp.inventory').factory("Order", ['$resource', function($resource) {
    var service = $resource('inventory/order', 
        { 'get':    {method:'JSONP', isArray:true},
          'query':  {method:'JSONP', isArray:true }
        }
    );
    return service;
}]);

/*
angular.module('inventoryApp.inventory').factory("Users", ['$resource', function($resource) {
    return {
        getId : function() {
        	return $resource('users/me', function(result) {
        		//resolve the promise as the data
        		return result.data;
        	});
        }
    }
}]);
*/
