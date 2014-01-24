angular.module('inventoryApp.inventory').controller('OrderController', ['$scope', '$filter', '$routeParams', '$location', 'Global', 'Order', function ($scope, $filter, $routeParams, $location, Global, Order) {

	$scope.create = function() {
        var order = new Order(
            {
                store: $scope.inventory.store,
                date: new Date(),
                needsAttention: true,
                items: []
            }
        );

        order.$save(function(response) {
            console.log(response);
            $location.path("inventory/order");
        });

    };

}]);