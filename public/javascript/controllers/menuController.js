angular.module('texasfossils').controller('MenuController', [
  '$scope',
  function ($scope) {
      $scope.title = "Welcome to Paleo Services. My name is Kris Howei and below are a few pictures of myself along with my mission statement. Click on any of items in the menu on the left for more content.";

      $scope.menuData = [
      {
        image: {
          url: '../../images/kris01.jpg',
          desc: 'Paleo Services is a site for fossil collectors...',
          alt: 'Paleo Services is a site for fossil collectors...'
        }
      },
      {
        image: {
          url: '../../images/kris02.jpg',
          desc: 'fossil preparators...',
          alt: 'fossil preparators...'
        }
      },
      {
        image: {
          url: '../../images/kris03.jpg',
          desc: 'and educators.',
          alt: 'and educators.'
        }
      }      
    ];
  }
]);