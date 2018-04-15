/**
 * Sources: https://github.com/nickperkinslondon/angular-bootstrap-nav-tree
 */
angular.module('texasfossils').controller('TreeController', [
  '$scope',
  '$timeout',
  'AjaxService',
  function ($scope, $timeout, ajax) {
    var tree;

    $scope.my_tree_handler = function (branch) {
      $scope.output = "<h2>" + branch.label + "</h2>";
      if (branch.data) {
        if (branch.data.url) {
          ajax.getTemplate(branch.data.url).then(function (html) {
            $scope.output += html;
          }, function () {
            console.error('Failed to find template at:' + branch.data.url);
          });
        }
      }
    };

    /**
    * Represents all the pages to be displayed on the web app.
    *
    * @type {[null]}
    */
    var treeData =
    [
      {
        label: 'Menu',
        data: {
          url: 'templates/menu/menu.html'
        },
        children: [
          {
            label: 'About Me',
            data: {
              url: 'templates/menu/aboutme.html'
            }
          },
          {
            label: 'Discoveries',
            data: {
              url: 'templates/menu/discoveries/discoveries.html'
            },
            children: [
              {
                label: 'Flexomornis howei',
                data: {
                  url: 'templates/menu/discoveries/flexo.html'
                }
              },
              {
                label: 'Xiphactinus',
                data: {
                  url: 'templates/menu/discoveries/xiphactinus.html'
                }
              }
            ]
          },
          {
            label: 'Gallery',
            data: {
              url: 'templates/menu/gallery.html'
            }
          },          
          {
            label: 'Services',
            data: {
              url: 'templates/menu/ratesAndServices.html'
            }
          },
          {
            label: 'Testimonials',
            data: {
              url: 'templates/menu/testimonials.html'
            }
          }
        ]
      }
    ];    

    $scope.my_data = angular.copy(treeData);
    $scope.my_tree = tree = {};
  }
]);
