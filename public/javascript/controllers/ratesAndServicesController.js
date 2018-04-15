/***
 * Simple, robust controller for the About Me page.
 */
angular.module('texasfossils').controller('RatesAndServices', [
  '$scope',
  function ($scope) {
    var emailAddress = "ptychodus04@yahoo.com";
    
    var fossiliferous = "<a href=\"http://www.fossiliferous.co.uk/\" class=\"fw_link_website\">FOSSILIFEROUS</a>";
    
    $scope.imageBeforeUrl = '../../images/before.jpg';
    $scope.imageBeforeAlt = 'Eldredgeops rana before preparation.';    
    $scope.imageAfterUrl = '../../images/after.jpg';
    $scope.imageAfterAlt = 'Eldredgeops rana after preparation.';    
    
    $scope.paragraphs = [
      "<b>Fossil Preparation:</b> $45 per hour, $60 per hour for rush orders.<br/><b>*</b>Special arrangements can be made for specimens that will be donated to a museum.",
      "<b>Fossil Collecting Trips:</b> $200 for 1/2 day, $400 for whole day. This is for a whole family. If you have a large group, we can work out custom pricing based on your desired trip.",
      "<b>Fossil Identification and Advice:</b> Free",
      "You can contact me at <a href=\"mailto:" + emailAddress + "\">" + emailAddress + "</a>",
      "<i>Are you looking for the highest quality fossils? Look no further than " + fossiliferous + ". I have known Mr. ER-Matheau-Raven for over ten years. He is a pleasure to work with and his fossils will amaze even the most seasoned collector.</i>"
    ];
    
    $scope.detailsParagraphs = [
      "Here is an image of an enrolled Eldredgeops rana trilobite before preparation.<br/>Kris applied a micro-hammer to prepare the trilobite within the same hour. The result is a stunning piece."
    ];
  }
]);

