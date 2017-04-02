angular.module('texasfossils').controller('DiscoveryController', [
  '$scope', 'AjaxService',
  function ($scope, AjaxService) {

    $scope.preface = 'Click on any of the links under the Discovery section in the menu to learn more about some <b>really cool</b> self-made discoveries.';

    $scope.data = [
      {
        name: 'Xiphactinus audax',
        id: 'xiphactinus_audax',
        introduction: 'Xiphactinus (from Latin and Greek for "sword-ray") is an extinct genus of large (4.5 to 6 m (15 to 20 feet) long) predatory marine bony fish that lived during the Late Cretaceous. When alive, the fish would have resembled a gargantuan, fanged tarpon (to which it was, however, not related).[3] The species Portheus molossus described by Cope is a junior synonym of X. audax. Skeletal remains of Xiphactinus have come from Kansas (where the first Xiphactinus fossil was discovered during the 1850s), and Cretaceous formations all over the East Coast (most notably Georgia, Alabama, North Carolina, and New Jersey) in the United States, as well as Europe, Australia, Canada and Venezuela. - Wikipedia',
        images: [
          {
            desc: 'Xiphactinus jaws in small fragments.',
            uri: 'images/xiphactinus_jaws_small.jpg',
            caption: 'These Xiphactinus audax jaws were part of an old collection I acquired from a gentleman in East Texas.'
          },
          {
            desc: 'Xiphactinus jaws in a complete set.',
            uri: 'images/xiphactinus_jaws_complete.jpg',
            caption: 'Here are the same jaws after 40 hours of repair and restoration. The wooden stand was used to hold the mounted jaws in place while I was working on them.'
          },
          {
            desc: 'Xiphactinus jaws mounted in an illuminated display case.',
            uri: 'images/xiphactinus_mount.jpg',
            caption: 'Here\'s the final product once the display case was completed.'
          }
        ]
      },
      {
        name: 'Flexomornis howei',
        id: 'flexomornis_howei',
        introduction: 'Let me introduce Flexomornis howei, the oldest bird in North America. I found the fossils in the Woodbine Formation in Grapevine, Texas. The fossils now reside at the Dallas Museum of Nature and Science.',
        images: [
          {
            desc: 'Wooden carved and painted model of a Flexomornix howei.',
            uri: 'images/flexo_conf_small.jpg',
            caption: 'This model was carved by Mr. Richard Finch.'
          },
          {
            desc: 'DMNS Press release with panel.',
            uri: 'images/flexo_conf_2.jpg',
            caption: 'Here I am with Dr. Tony Fiorillo, Dr. Ron Tykoski, and Flexomornis at the DMNS press release.'
          },
          {
            desc: 'Presentation before the press.',
            uri: 'images/aboutme.jpg',
            caption: "Here's another photo from the press release."
          },
          {
            desc: 'Flexomornix howei model with panel displayed on HDTV in Times Square.',
            uri: 'images/flexo_times_square.jpg',
            caption: "Here's a shot of the announcement in Times Square!"
          }
        ]
      },
      {
        name: 'Pentanogmius',
        id: 'pentanogmius',
        paragraphs: [
        ]
      }
    ];

    $scope.lookup = function (search) {
      console.log('search for: ' + search);
      return _.findWhere($scope.data, {id: search});
    };
  }
]);
