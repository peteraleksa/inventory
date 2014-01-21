angular.module('inventoryApp.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Inventory",
        "link": "inventory/locations"
    }, 
    {
        "title": "Add/Delete Item",
        "link": "inventory/enter"
    },
    {
        "title": "Add Store",
        "link": "inventory/store"
    },
    {
    	"title": "About",
    	"link": "about"
    }];

    $scope.authmenu = [];
    
    $scope.isCollapsed = false;
}]);