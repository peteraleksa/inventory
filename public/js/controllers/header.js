angular.module('inventoryApp.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Inventory",
        "link": "inventory/list",
    }, 
    {
    	"title": "About",
    	"link": "about",
    }];

    $scope.authmenu = [];
    
    $scope.isCollapsed = false;
}]);