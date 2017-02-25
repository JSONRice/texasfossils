angular.module('texasfossils').controller('DiscoveryController', [
  '$scope',
  function ($scope) {
    $scope.info = 'Click on any of the links under the Discovery section in the menu to learn more about some <b>really cool</b> self-made discoveries.';
    $scope.data = [
      {
        name: 'Xiphactinus audax',
        page: 'xiphactinus_audax.html',
        paragraphs: [
          'These Xiphactinus audax jaws were part of an old collection I acquired from a gentleman in East Texas.',
          'Here are the same jaws after 40 hours of repair and restoration. The wooden stand was used to hold the mounted jaws in place while I was working on them.',
          'Here\'s the final product once the display case was completed.'
        ],
        images: [
          {
            desc: 'Xiphactinus jaws in small fragments.',
            uri: 'xiphactinus_jaws_small.jpg'
          },
          {
            desc: 'Xiphactinus jaws in a complete set.',
            uri: 'xiphactinus_jaws_complete.jpg'
          },
          {
            desc: 'Xiphactinus jaws mounted in an illuminated display case.',
            uri: 'xiphactinus_mount.jpg'
          }
        ]
      }      
    ];
  }
]);
