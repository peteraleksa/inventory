//service used for inventory REST endpoint
angular.module('inventoryApp.inventory').factory("Inventory", ['$resource', function($resource) {
    var service = $resource('inventory/:inventoryId', {
            inventoryId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
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
