//Setting up route
/***********************************************
  This is where we route to the partials,

    /welcome
      the welcome page
      uses the WelcomeController controller

    /inventory/enter
      the page for choosing composition options
      uses the InventoryController controller

    /inventory/list
      shows the list of all inventory 
      uses the InventoryController controller

    /inventory/users/:userId where userId is the id of the current user
      shows the list of all inventory belonging to user
      uses the InventoryController controller

    /inventory/users/:userId where userId is the id of the current user
      shows the list of all inventory favorited by the user
      uses the InventoryController controller

    /about
      the about page

    /inventory/:InventoryId where InventoryId is the id of the Inventory object to view 
      shows the Inventory detail viewd
      uses the InventoryController controller

    default view is /welcome

 **********************/

window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
          when('/welcome', {
            templateUrl: 'views/welcome.html',
            controller: 'WelcomeController'
          }).
          when('/inventory/enter', {
            templateUrl: 'views/inventory/enter.html',
            controller: 'InventoryController'
          }).
          when('/inventory/list', {
            templateUrl: 'views/inventory/list.html',
            controller: 'InventoryController'
          }).
          when('/inventory/order', {
          	templateUrl: 'views/inventory/order.html',
          	controller: 'InventoryController'
          }).
          when('/about', {
            templateUrl: 'views/about.html'
          }).
          otherwise({
            redirectTo: '/welcome'
          });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);

