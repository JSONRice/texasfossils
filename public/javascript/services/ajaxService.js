angular.module('texasfossils').service('AjaxService', [
  '$templateRequest',
  '$sce',
  '$q',
  '$http',
  function ($templateRequest, $sce, $q, $http) {

    /**
     * Given a url fetch the template markup.
     * 
     * @param {String} url to template markup.
     * @return {promise} AJAX promise to receive the template markup from the url.
     */
    function getTemplate(url) {
      return $templateRequest($sce.getTrustedResourceUrl(url));
    }

    /**
     * Asynchronous HTTP GET from a given url (local or remote).
     * @param {type} url
     * @returns {$q@call;defer.promise}
     */
     function httpGET(url) {
      var deferred = $q.defer();
      $http.get(url).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject();
      });
      return deferred.promise;
    }
    
    /**
     * Asynchronous HTTP POST some data to the given url (local or remote).
     * @param {type} url
     * @param {type} data to POST
     * @returns {$q@call;defer.promise}
     */
     function httpPOST(url, data) {
      var deferred = $q.defer();
      $http.post(url, data).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject();
      });
      return deferred.promise;
    }
    
    /**
     * Asynchronous HTTP DELETE
     * @param {type} url to delete object from
     * @returns {$q@call;defer.promise}
     */
    function httpDELETE(url) {
      var deferred = $q.defer();
      $http.delete(url).success(function(response) {
        deferred.resolve(response);     
      }).error(function (response) {
        deferred.reject();
      });
      return deferred.promise;
    }
    
    
    return({
      getTemplate: getTemplate,
      httpGET: httpGET,
      httpPOST: httpPOST,
      httpDELETE: httpDELETE
    });
  }
]);