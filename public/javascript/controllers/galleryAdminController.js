angular.module('texasfossils').controller('GalleryAdminController', [
  'GalleryService', 'AjaxService', '$scope', '$uibModal', '$location', '$route',
  function (GalleryService, ajax, $scope, $uibModal, $location, $route) {
    $scope.title = "Gallery Manager";

    // Fetch all the image metadata at once. The linked images from the file system will
    // be in the browsers cache after the initial load.
    ajax.httpGET('/api/images')
      .then(function (data) {
        if (!data) {
          console.log("HTTP GET response is empty. Check parameters.");
        }
        else {
          // Load into the ng-image-gallery:
          $scope.imageMetadata = [];
          $scope.imageMetadata = GalleryService.formatGalleryImageMetadata(data);
          if ($scope.imageMetadata.length > 0) {

            // Allow each image to be deleted (admin only):
            angular.forEach($scope.imageMetadata, function (v, k) {
              v.deletable = true;
            });
          }
        }
      }, function (response, status) {
        console.log("HTTP GET failure response: " + response + " " + status);
      });

    // Delete an image in the database. Unlinks from the file system.
    var removeImage = function (imgName) {
      ajax.httpDELETE('/api/images/delete/' + imgName)
        .then(function (data) {
          if (!data) {
            console.log("HTTP DELETE response is empty. Check parameters.");
            return;
          }
          console.log("reload the page");
          $route.reload();          
        }, function (response, status) {
          if (response && status) {
            console.log("HTTP DELETE failure response: " + response + " " + status);
          } else {
            console.warn("HTTP DELETE failed.");
          }
        });
    };

    $scope.returnHome = function () {
      $location.path('/');
      $scope.imageMetadata = [];
    };

    $scope.deleteImg = function (img) {
      var imgUrlSegments = img.url.split('/');
      var imageRealName = '';
      if (imgUrlSegments.length > 1) {
        imageRealName = imgUrlSegments[imgUrlSegments.length - 1];
      } else if (imgUrlSegments.length === 1) {
        imageRealName = imgUrlSegments[0];
      } else if (imgUrlSegments.length <= 0) {
        console.warn('GalleryAdminController attempted to delete a non-existent image.');
        return;
      }
      console.log("remove the image");
      removeImage(imageRealName);
    };
  }
]);