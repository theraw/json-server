'use strict';

/**
 * @ngdoc function
 * @name zdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zdApp
 */
angular.module('zdApp')
  .controller('MainCtrl', ['$scope', 'MainService', '$mdDialog', '$route', 
  	function($scope, MainService, $mdDialog, $route) {

	$scope.query = {
		order: 'name',
		limit: 30,
		page: 1
	};
	$scope.limitOptions = [10, 20, 30];
    $scope.showError = true;
    $scope.showTable = false;
    $scope.search = {};
    $scope.easterEgg = false;

    getContacts();

	function getContacts() {
		 MainService.getContacts().then(function(response) {
            if (response.status !== 200) {
                console.log('there is an error getting the contacts');
            } else {
                $scope.showError = false;
                $scope.showTable = true;
    	        $scope.contacts = response.data;
            }
	    });
	}

 	$scope.addContact = function(ev) {
		  $mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'views/dialog.tmpl.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		    });
 	}

    $scope.inputIsChanged = function(ev) {
        if ($scope.search.contacts === 'kelley') {
            $scope.easterEgg = true;
        } else {
            $scope.easterEgg = false;
        }
    }

 	function DialogController($scope, $mdDialog, $route) {
        $scope.dialogErrorMsg = false;
		$scope.submitContact = function() {
	 		var newContact = {
		 			'name': $scope.newContact.name,
		 			'number': $scope.newContact.number,
		 			'context': $scope.newContact.context
	 		};
	 		MainService.submitContact(newContact).then(function(response) {
                if (response.status !== 201) {
                    $scope.dialogErrorMsg = true;
                } else {
                    $scope.dialogErrorMsg = false;
    	 			$mdDialog.hide();
    	 			$route.reload();
                }
	 		}, function(error) {
	 			console.log('there is an error');
	 		});
	 	}
	}

  }])

  .filter('tel', function() {
  	    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };

  });
