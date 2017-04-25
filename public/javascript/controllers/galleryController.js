angular.module('texasfossils').controller('GalleryController', [
  'GalleryService', 'AjaxService', '$scope', '$uibModal',
  function (GalleryService, ajax, $scope, $uibModal) {
    
    $scope.imageMetadata = [];
    
    $scope.formData = {
      user: '',
      password: ''
    };

    // Fetch all the image metadata at once. The linked images from the file system will
    // be in the browsers cache after the initial load.
    ajax.httpGET('/api/images')
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
      
    $scope.openAdminLogin = function (size) {
      $scope.modalInstance('../../templates/widgets/modals/adminLogin.html', size);
    };

    $scope.modalInstance = function (templateUrl, size) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: templateUrl,
        controller: function ($uibModalInstance, $scope) {
          $scope.cancel = function () {
            $scope.formData = {};
            $uibModalInstance.dismiss('cancel');
          };

          $scope.ok = function () {
            // Note pass any data you wish back to the client from the modal here:      
            $uibModalInstance.close($scope.formData);
            $scope.formData = {};
          };
        },
        size: size,
        // Don't use 'this' here just use the controller $scope with all the properties
        scope: $scope,
        // pass any data to modal controller here:
        resolve: {
          /* No data needed in modal as the fields are all cleared and require user input:
           newTestimonial: function () {
           return $scope.form;
           }
           */
        }
      });
      // Optional: can use this to select an item bound to the modal
      modalInstance.result.then(
        // user clicked Ok or Submit
        function (formData) {
         if (formData.user && formData.password) {
            // Whatever is submitted and what is in this controller must match
            // because the form fields should be two-way bound with ng-model:
            if (formData !== $scope.formData) {
              console.warn('There is a discrepancy in the submitted form data within the GalleryController.');
              return;
            }
            $scope.madeSelection = true;
// TODO: authenticate
//            // POST new testimonial:
//            ajax.httpPOST('/api/gallery', formData)
//              .then(function (data) {
//                if (data) {
//                  console.log("/api/testimonials responded with: " + data.message.uploaded);
//                }
//              }, function (response, status) {
//                console.log("HTTP GET failure response: " + response + " " + status);
//              });
          } else {
            console.warn('Some required form fields are incomplete. Cancelling upload.');
          }
        },
        // user clicked Cancel
        function () {
          $scope.madeSelection = false;
        }
      );      
    };
  }
]);