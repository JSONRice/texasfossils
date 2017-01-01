/**
 * Sources: https://github.com/nickperkinslondon/angular-bootstrap-nav-tree
 */
angular.module('texasfossils').controller('TreeController', [
  '$scope',
  '$timeout',
  'AjaxService',
  function ($scope, $timeout, ajax) {
    var apple_selected;
    var tree;
    var treedata;

    $scope.my_tree_handler = function (branch) {
      $scope.output = "<h1>" + branch.label + "</h1>";
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
    
    treedata = [{
        label: 'Menu',
        data: {
          url: 'templates/menu/menu.html'
        },
        children: [
          {
            label: 'MEAN Stack Introduction',
            data: {
              url: 'templates/tutorials/toc/meanIntro/meanIntro.html'
            },
            children: [
              {
                label: 'MongoDB',
                data: {
                  url: 'templates/tutorials/toc/meanIntro/mongo.html'
                }
              },
              {
                label: 'ExpressJS',
                data: {
                  url: 'templates/tutorials/toc/meanIntro/express.html'
                }
              },
              {
                label: 'AngularJS',
                data: {
                  url: 'templates/tutorials/toc/meanIntro/angular.html'
                }
              },
              {
                label: 'NodeJS',
                data: {
                  url: 'templates/tutorials/toc/meanIntro/node.html'
                }
              }
            ]
          },
          {
            label: 'Server Side Overview',
            data: {
              url: 'templates/tutorials/toc/serverSideOverview/serverSideOverview.html'
            },
            children: [
              {
                label: 'NodeJS Setup',
                data: {
                  url: "templates/tutorials/toc/serverSideOverview/nodeSetup.html"
                }
              },
              {
                label: 'ExpressJS Setup',
                data: {
                  url: "templates/tutorials/toc/serverSideOverview/expressSetup/expressSetup.html"
                },
                children: [
                  {
                    label: 'ElectrolyteJS',
                    data: {
                      url: "templates/tutorials/toc/serverSideOverview/expressSetup/electrolyte.html"
                    }
                  }
                ]
              },
              {
                label: 'Mongo Setup',
                data: {
                  url: "templates/tutorials/toc/serverSideOverview/mongoSetup/mongoSetup.html"
                },
                children: [
                  {
                    label: 'Mongoose Setup',
                    data: {
                      url: "templates/tutorials/toc/serverSideOverview/mongoSetup/mongooseSetup.html"
                    }
                  }
                ]
              },
              {
                label: 'Gulp and Test Setup',
                data: {
                  url: "templates/tutorials/toc/serverSideOverview/gulpSetup.html"
                }
              }
            ]
          },
          {
            label: 'Client Side Overview',
            data: {
              url: 'templates/tutorials/toc/clientSideOverview/clientSideOverview.html'
            },
            children: [
              {
                label: 'Angular Basics',
                data: {
                  url: 'templates/tutorials/toc/clientSideOverview/angularBasics.html'
                }
              },
              {
                label: 'Angular UI',
                data: {
                  url: 'templates/tutorials/toc/clientSideOverview/angularUI/angularUI.html'
                },
                children: [
                  {
                    label: 'Tree Table of Contents',
                    data: {
                      url: 'templates/tutorials/toc/clientSideOverview/angularUI/angularUITreeToC.html'
                    }
                  },
                  {
                    label: 'Inline Table of Contents',
                    data: {
                      url: 'templates/tutorials/toc/clientSideOverview/angularUI/angularUIInToC.html'
                    }
                  },
                  {
                    label: 'Modals (Dialogs)',
                    data: {
                      url: 'templates/tutorials/toc/clientSideOverview/angularUI/angularUIModals.html'
                    }
                  },
                  {
                    label: 'Calendar',
                    data: {
                      url: 'templates/tutorials/toc/clientSideOverview/angularUI/angularUICalendar.html'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ];    

    $scope.my_data = angular.copy(treedata);
    $scope.my_tree = tree = {};
  }
]);
