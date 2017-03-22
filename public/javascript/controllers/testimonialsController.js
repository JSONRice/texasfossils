/***
 * Testimonials controller.
 */
angular.module('texasfossils').controller('TestimonialsController', [
  '$scope',
  'AjaxService',
  'ModalService',
  function ($scope, ajax, modalService) {

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
      console.log('openSubmitNewTestimonial');
      modalService.modalInstance('../../templates/widgets/modals/submitNewTestimonial.html', size, $scope);
    };
  }
]);