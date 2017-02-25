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
    this.httpGET = function (url) {
      var deferred = $q.defer();
      $http.get(url).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject();
      });
      return deferred.promise;
    };

    /**
     * A service should have it's functions exposed either via this or in a return object.
     */
    return({
      getTemplate: getTemplate
    });
  }]);