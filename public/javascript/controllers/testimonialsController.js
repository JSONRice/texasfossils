/***
 * Testimonials controller.
 */
angular.module('texasfossils').controller('TestimonialsController', [
  '$scope',
  'AjaxService',
  '$uibModal',
  function ($scope, ajax, $uibModal) {
    $scope.setSubmitButtonClicked = function () {
      return ($scope.submitButtonClicked = true);
    };

    // TODO: once this web app is hooked up to a live web domain then
    // register a captcha with that domain here: https://www.google.com/recaptcha/admin#list
    // Then check the gRecaptchaResponse for a value prior to submitting a testimonial.
    // Make sure the valid captcha comes back. The captcha markup is commented out in 
    // testimonials.html 
    $scope.gRecaptchaResponse = '';

    $scope.$watch('gRecaptchaResponse', function () {
      $scope.expired = false;
    });

    $scope.expiredCallback = function expiredCallback() {
      $scope.expired = true;
    };

    $scope.maxCharsForTestimony = 300;

    $scope.formData = {
      email: '',
      author: '',
      title: '',
      text: ''
    };

    // Pre-load all testimonials:
    ajax.httpGET('/api/testimonials')
      .then(function (data) {
        if (!data) {
          console.log("HTTP GET response is empty. Check parameters.");
        }
        else {
          $scope.data = angular.copy(data);
        }
      }, function (response, status) {
        console.log("HTTP GET failure response: " + response + " " + status);
      });

    $scope.openSubmitNewTestimonial = function (size) {
      $scope.modalInstance('../../templates/widgets/modals/submitNewTestimonial.html', size);
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
          if (formData.email && formData.author && formData.text) {
            // Whatever is submitted and what is in this controller must match
            // because the form fields should be two-way bound with ng-model:
            if (formData !== $scope.formData) {
              console.warn('There is a discrepancy in the submitted form data within the TestimonialsController.');
              return;
            }
            $scope.madeSelection = true;
            // POST new testimonial:
            ajax.httpPOST('/api/testimonials', formData)
              .then(function (data) {
                if (data) {
                  console.log("/api/testimonials responded with: " + data.message.uploaded);
                }
              }, function (response, status) {
                console.log("HTTP GET failure response: " + response + " " + status);
              });
          } else {
            console.warn('Some required form fields are incomplete. Cancelling testimonial upload.');
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