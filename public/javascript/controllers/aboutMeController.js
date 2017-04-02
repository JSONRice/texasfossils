/***
 * Simple, robust controller for the About Me page.
 */
angular.module('texasfossils').controller('AboutMe', [
  '$scope',
  'AjaxService',
  function ($scope, AjaxService) {
    $scope.imageAlt = 'Presenting before an audience about fossil birds in Texas.';
    $scope.paragraphs = [
      "My name is Kris Howe. I have been collecting fossils for 35 years. I live in Dallas, Texas and regularly get into the field for collecting trips. I enjoy collecting and prepairing fossils. Many of the fossils that I find are donated to the Museum of Nature and Science, Dallas.",
      "I'm the goofy looking guy in the middle. This picture was taken at a press conference at the MNS. This was the announcement of my discovery of Flexomornis howei, the oldest bird in North America. On the left is Dr. Ron Tykoski, Chief Fossil Preparator for the MNS. On the right is Dr. Tony Fiorillo, Curator of the MNS."
    ];

    AjaxService.httpGET('/api/images/name/aboutme.jpg')
      .then(function (data) {
        if (!data) {
          console.log("HTTP GET response is empty. Check parameters.");
        }
        else {
          $scope.imageUrl = data.metadata.file_path + '/' + data.name;
        }
      }, function (response, status) {
        console.log("HTTP GET failure response: " + response + " " + status);
      });
  }
]);

