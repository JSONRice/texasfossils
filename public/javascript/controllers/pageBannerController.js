angular.module('texasfossils').controller('PageBannerController', [
  '$scope',
  '$location',
  '$uibModal',
  '$log',
  function ($scope, $location, $uibModal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '../../templates/faqModal.html',
        controller: 'ModalInstanceController',
        size: size,
        // pass any data to modal controller here:
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
]);


