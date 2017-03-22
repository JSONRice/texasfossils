angular.module('texasfossils').service('ModalService', [
  '$uibModal',
  function ($uibModal) {
    this.modalInstance = function (templateUrl, size, scope) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: templateUrl,
        controller: function ($uibModalInstance, $scope) {
          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.ok = function () {
            // Note pass any data you wish back to the client from the modal here:      
            $uibModalInstance.close($scope.data);
          };
        },
        size: size,
        // Don't use 'this' here just use the controller $scope with all the properties
        scope: scope,
        // pass any data to modal controller here:
        resolve: {
          items: function () {
            return scope.items;
          }
        }
      });
      // Optional: can use this to select an item bound to the modal
      modalInstance.result.then(
        // user clicked Ok
          function (selectedItem) {
            if (selectedItem) {
              scope.selected = selectedItem;
              scope.madeSelection = true;
            }
          },
          // user clicked Cancel
            function () {
              scope.madeSelection = false;
            });
        };
    }
]);


