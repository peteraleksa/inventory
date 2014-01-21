angular.module('inventoryApp.inventory').controller('InventoryController', ['$scope', '$filter', '$routeParams', '$location', 'Global', 'Inventory', function ($scope, $filter, $routeParams, $location, Global, Inventory) {
    $scope.global = Global;
    // search query
    $scope.query = '';  
    
    $scope.create = function() {
        var inventory = new Inventory(
            {
                store: $scope.store,
                updated: Date.now,
                items: []
            }
        );

        inventory.$save(function(response) {
            console.log(response);
            $location.path("inventory/" + response._id);
        });

    };

    $scope.remove = function(inventory) {
        inventory.$remove();  

        for (var i in $scope.inventory) {
            if ($scope.inventory[i] == inventory) {
                $scope.inventory.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var inventory = $scope.inventory;
        if (!inventory.updated) {
            inventory.updated = [];
        }
        inventory.updated.push(new Date().getTime());

        inventory.$update(function() {
            $location.path('inventory/' + inventory._id);
        });
    };

    $scope.find = function() {
        Inventory.query(function(inventory) {
            $scope.inventory = inventory;
        });
    };

    $scope.findOne = function() {
        Inventory.get({
            inventoryId: $routeParams.inventoryId
        }, function(inventory) {
            $scope.inventory = inventory;
        });
    };


    $scope.loadInventory = function() {
        Inventory.get({
            inventoryId: $routeParams.inventoryId
        }, function(inventory) {
            $scope.inventory = inventory;
            console.log(inventory);
        });

    };

}]);