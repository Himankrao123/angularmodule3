// Define the Angular module
angular.module('NarrowItDownApp', [])

// Define the MenuSearchService
.service('MenuSearchService', ['$http', function($http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: 'GET',
      url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
    }).then(function(response) {
      var foundItems = [];
      var menuItems = response.data;
      if (menuItems) {
        for (var i = 0; i < menuItems.length; i++) {
          if (menuItems[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
            foundItems.push(menuItems[i]);
          }
        }
      }
      return foundItems;
    }).catch(function(error) {
      console.error('Error retrieving menu items:', error);
      return [];
    });
  };
}])

// Define the NarrowItDownController
.controller('NarrowItDownController', ['MenuSearchService', function(MenuSearchService) {
  var narrowCtrl = this;

  narrowCtrl.searchTerm = '';
  narrowCtrl.foundItems = [];

  narrowCtrl.narrowItDown = function() {
    if (narrowCtrl.searchTerm.trim() === '') {
      narrowCtrl.foundItems = [];
      return;
    }

    MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
      .then(function(foundItems) {
        narrowCtrl.foundItems = foundItems;
      });
  };

  narrowCtrl.onRemove = function(index) {
    narrowCtrl.foundItems.splice(index, 1);
  };
}]);
