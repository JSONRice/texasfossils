angular.module('texasfossils').controller('GalleryController', [
  'GalleryService', 'AjaxService', '$scope',
  function (GalleryService, AjaxService, $scope) {
    
    $scope.imageMetadata = [];

    // Fetch all the image metadata at once. The linked images from the file system will
    // be in the browsers cache after the initial load.
    AjaxService.httpGET('/api/images')
      .then(function (data) {
        if (!data) {
          console.log("HTTP GET response is empty. Check parameters.");
        }
        else {
          // Load into the ng-image-gallery:
          $scope.imageMetadata = GalleryService.formatGalleryImageMetadata(data);
        }
      }, function (response, status) {
        console.log("HTTP GET failure response: " + response + " " + status);
      });      
  }
]);