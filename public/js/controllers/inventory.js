angular.module('inventoryApp.inventory').controller('InventoryController', ['$scope', '$filter', '$routeParams', '$location', 'Global', 'Inventory', function ($scope, $filter, $routeParams, $location, Global, Inventory) {
    $scope.global = Global;
    // search query
    $scope.query = '';  
    $scope.listSort = 'product';
    $scope.updating = false;
    $scope.updatecomplete = false;
    $scope.selectedStore = 'all';
    $scope.needName = false;
    
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
            $location.path("inventory/stores/" + response._id);
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

    $scope.update = function(form) {

        if(form.$valid) {
            var inventory = $scope.inventory;
            if (!inventory.updated) {
                inventory.updated = [];
            }
            //inventory.updated.push(new Date().getTime());

            inventory.$update(function() {
                $scope.updating = false;
                $scope.updatecomplete = true;
                $location.path('inventory/stores/' + inventory._id);
            });
        } else {
            $scope.needName = true;
        }
    };

    $scope.enter = function() {
        $scope.listSort = 'product';
        $scope.updatecomplete = false;
        $scope.updating = true;
    }

    $scope.find = function() {
        Inventory.query(function(inventory) {
            $scope.inventory = inventory;
        });
    };

    $scope.findOne = function() {
        Inventory.get({
            storeId: $routeParams.storeId
        }, function(inventory) {
            $scope.inventory = inventory;
        });
    };

    $scope.loadInventory = function() {
        Inventory.get({
            storeId: $routeParams.storeId
        }, function(inventory) {
            $scope.inventory = inventory;
            console.log(inventory);
        });

    };

    $scope.getReorders = function() {
        Inventory.get({
            storeId: $routeParams.storeId
        }, function(inventory) {
            $scope.inventory = inventory;
            console.log(inventory);
        });
    };

}]);