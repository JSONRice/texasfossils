texasfossils.directive('testimonies', [
  function () {
    return {
      restrict: 'E',
      templateUrl: "../../templates/widgets/testimonies.html",
      scope: {
        data: '='
      }
    };
  }
]);