angular.module('inventoryApp.inventory').controller('ListController', ['$scope', '$routeParams', '$location', 'Global', 'Inventory', function ($scope, $routeParams, $location, Global, Inventory) {
    $scope.global = Global;

}]);