window.app = angular.module('inventoryApp', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'uiSlider', 'inventoryApp.system', 'inventoryApp.inventory']);
angular.module('inventoryApp.system', []);
angular.module('inventoryApp.inventory', []);
angular.module('uiSlider', []);