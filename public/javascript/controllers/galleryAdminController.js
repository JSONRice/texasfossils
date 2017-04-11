angular.module('texasfossils').controller('GalleryAdminController', [
  'GalleryService', 'AjaxService', '$scope', '$uibModal',
  function (GalleryService, ajax, $scope, $uibModal) {
    $scope.title = "Welcome to the Gallery ADMIN Page. We are under construction! Come back soon!"
  }
]);