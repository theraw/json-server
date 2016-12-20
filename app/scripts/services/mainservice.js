'use strict';

/**
 * @ngdoc service
 * @name zdApp.mainService
 * @description
 * # mainService
 * Service in the zdApp.
 */
angular.module('zdApp')
  .service('MainService', ['$http', '$q',
  	function ($http, $q) {

	    this.getContacts = function(){
			var def = $q.defer();
			$http({
				method: 'GET',
				url: '/contacts'
			}).then(function successCallback(response) {
				def.resolve(response);
				return response.data;
			  }, function errorCallback(error) {
				console.log('there is an error');
				def.resolve(error);
				return error;
			  });
			return def.promise;
	    };

	    this.submitContact = function(newContact) {
	    	console.log('service submitContact');
	    	console.log('new contact = ' + JSON.stringify(newContact));
			var def = $q.defer();
			$http({
				method: 'POST',
				url: '/contacts',
				data: newContact
			}).then(function successCallback(response) {
				def.resolve(response);
				return response.data;
			  }, function errorCallback(error) {
				console.log('there is an error');
				def.resolve(error);
				return error;
			  });
			return def.promise; 
	    };

  }]);
