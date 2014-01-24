//service used for inventory REST endpoint
angular.module('inventoryApp.inventory').factory("Order", ['$resource', function($resource) {
    return $resource('inventory/order');

}]);