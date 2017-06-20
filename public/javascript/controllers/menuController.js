angular.module('texasfossils').controller('MenuController', [
  '$scope',
  '$location',
  '$timeout',
  function ($scope, $location, timeout) {    
    $scope.menuData = [
      {
        image: {
          url: '../../images/kris01.jpg',
          desc: 'Texas fossils is a site for fossil collectors...',
          alt: 'Kris'
        }
      },
      {
        image: {
          url: '../../images/kris02.jpg',
          desc: 'fossil preparators...',
          alt: 'Kris'
        }
      },
      {
        image: {
          url: '../../images/kris03.jpg',
          desc: 'and educators.',
          alt: 'Kris'
        }
      }      
    ];
  }
]);