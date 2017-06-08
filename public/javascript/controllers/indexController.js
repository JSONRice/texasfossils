angular.module('texasfossils').controller('IndexController', [
  '$scope',
  '$modal',
  'indexService',
  function($scope, $modal, indexService) {
    $scope.status = {};
    $scope.status.isOpen = false;
    $scope.input = {};
    $scope.input.search = "";
    $scope.input.owner = "";
    $scope.input.entry = -1;
    $scope.input.states = [];
    $scope.input.disciplineStates = [];
    $scope.homeSort = {};
  }
]);