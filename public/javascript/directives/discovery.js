texasfossils.directive('discovery', [
  'AjaxService',
  function (ajax) {
    return {
      restrict: 'E',
      templateUrl: "../../templates/widgets/discovery.html",
      /**
       * Isolated Scope: pass some values from the parent scope to the directives
       * There’re 3 types of prefixes AngularJS provides
       * "@" ( Text binding / one-way binding )
       * "=" ( Direct model binding / two-way binding )
       * "&" ( Behaviour binding / Method binding )
       */
      scope: {
        data: '='
      }
    };
  }
]);