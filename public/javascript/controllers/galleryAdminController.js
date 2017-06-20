angular.module('texasfossils').controller('GalleryAdminController', [
  'GalleryService', 'AjaxService', '$scope',
  '$uibModal', '$location', '$route', 'Upload', '$timeout', 'upload',
  function (GalleryService, ajax, $scope,
    $uibModal, $location, $route, Upload, $timeout, upload) {

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
        .then(
          function (data) {
            if (!data) {
              console.log("HTTP DELETE response is empty. Check parameters.");
              return;
            }
            console.log("reload the page");
            $route.reload();
          }
        )
        .catch(
          function (response) {
            if (response && response.status) {
              console.log("HTTP DELETE failure response: " + response + " " + status);
            } else {
              console.warn("HTTP DELETE failed.");
            }
          }
        );
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

    $scope.uploadPic = function (formData, filters) {
      if (!Upload.isFile(formData.picFile)) {
        console.warn('Can not upload non-file param.');
        return;
      }

      // closure that is invoked upon successful binary upload:
      var logicalPost = function (response) {
        // This may look odd but keep in mind that after the user selects a binary image file
        // then the name must be copied over from the picFile in the form to the formData object
        // because this key links the hard copy on file with the logical copy on the database:
        $scope.formData.imgName = formData.picFile.name;
        ajax.httpPOST('/api/images/logicalImageUpload', $scope.formData)
          .then(function (response) {
            console.log("/api/images/logicalImageUpload responded with: " + response.message);
            getImages();
          }, function (response) {
            console.log("HTTP POST failure response: " + response.response + " " + response.status);
          });
      };

      Upload.upload({
        url: '/api/binaryImageUploader',
        method: 'POST',
        headers: {
          'Content-Type': formData.picFile.type === null || formData.picFile.type === '' ?
            'application/octet-stream' : formData.picFile.type
        },
        data: {
          filename: formData.picFile.name
        },
        file: formData.picFile
      }, true).then(function (response) {
        console.log('Success ' + response.config.data.file.name +
          ' uploaded. Response: ' + response.data);
        console.log(response.config);
        console.log(response.config.data);
        console.log(response.config.data.file);

        $timeout(function () {
          $scope.formData.picFile.result = formData.picFile.result = response.data;
          // now that the hard file has been uploaded update the database
          logicalPost(response);
        });
      }, function (response) {
        console.log('error');
        console.log(response);
        if (response.status > 0) {
          $scope.errorMsg = response.status + ': ' + response.data;
          console.warn($scope.errorMsg);
        }
      }, function (evt) {
        console.log('notification');
        // Math.min is to fix IE which reports 200% sometimes
        $scope.formData.picFile.progress = formData.picFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    };
  }
]);
