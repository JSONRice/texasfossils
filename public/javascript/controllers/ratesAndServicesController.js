/***
 * Simple, robust controller for the About Me page.
 */
angular.module('texasfossils').controller('RatesAndServices', [
  '$scope',
  'AjaxService',
  function ($scope, AjaxService) {
    $scope.imageAlt = 'Anciet Ecphora.';
    
    var emailAddress = "ptychodus04@yahoo.com";
    
    var fossiliferous = "<a href=\"http://www.fossiliferous.co.uk/\" class=\"fw_link_website\">FOSSILIFEROUS</a>";
    
    $scope.paragraphs = [
      "<b>Fossil Preparation:</b> $45 per hour, $60 per hour for rush orders.<br/><b>*</b>Special arrangements can be made for specimens that will be donated to a museum.",
      "<b>Fossil Collecting Trips:</b> $200 for 1/2 day, $400 for whole day. This is for a whole family. If you have a large group, we can work out custom pricing based on your desired trip.",
      "<b>Fossil Identification and Advice:</b> Free",
      "You can contact me at <a href=\"mailto:" + emailAddress + "\">" + emailAddress + "</a>",
      "<i>Are you looking for the highest quality fossils? Look no further than " + fossiliferous + ". I have known Mr. ER-Matheau-Raven for over ten years. He is a pleasure to work with and his fossils will amaze even the most seasoned collector.</i>"
    ];

    AjaxService.httpGET('/api/images/name/ecphora.jpg')
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

