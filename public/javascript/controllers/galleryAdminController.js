angular.module('texasfossils').controller('GalleryAdminController', [
  'GalleryService', 'AjaxService', '$scope',
  '$uibModal', '$location', '$route', 'Upload', '$timeout',
  function (GalleryService, ajax, $scope,
    $uibModal, $location, $route, Upload, $timeout) {
      
    $scope.maxChars = 500;
    $scope.title = "Gallery Manager";
    $scope.formData = {
      picFile: null,
      imgCaption: '',
      imgName: ''
    };

    var getImages = function () {
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
    };

    getImages();

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


    $scope.uploadPic = function (file, filters) {
      file.upload = Upload.upload({
        url: '/api/binaryImageUploader',
        data: {file: file}
      });
      
      console.log('File is:');
      console.log(file);

      // FILTERS
      /*
       if (filters && filters.length > 0) {
       upload.filters.push({
       name: 'imageFilter',
       fn: function (item, options) {
       var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
       var filterList = '|';
       
       angular.forEach(filters, function (value, key) {
       filterList += value + '|';
       });
       
       return filterList.indexOf(type) !== -1;
       }
       });
       }
       */

      file.upload.then(function (response) {
        $timeout(function () {
          $scope.formData.picFile.result = file.result = response.data;
          // POST new logical image:
          ajax.httpPOST('/api/images/logicalImageUpload', formData)
            .then(function (data) {
              if (data) {
                console.log("/api/images/logicalImageUpload responded with: " + data.message.uploaded);
              }
            }, function (response, status) {
              console.log("HTTP POST failure response: " + response + " " + status);
            });
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        $scope.formData.picFile.progress = file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    };
  }
]);