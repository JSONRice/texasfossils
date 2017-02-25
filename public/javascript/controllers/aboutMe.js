/* 
 * Simple, robust controller for the About Me page.
 */
angular.module('texasfossils').controller('AboutMe', [
  '$scope',
  function ($scope) {
    $scope.imageUrl = 'http://texasfossils.webs.com/Flexo%20Conf%201%20Small.jpg';
    $scope.imageAlt = 'Presenting before an audience about fossil birds in Texas.';    
    $scope.p1 = "My name is Kris Howe. I have been collecting fossils for 35 years. I live in Dallas, Texas and regularly get into the field for collecting trips. I enjoy collecting and prepairing fossils. Many of the fossils that I find are donated to the Museum of Nature and Science, Dallas.";
    $scope.p2 = "I\'m the goofy looking guy in the middle. This picture was taken at a press conference at the MNS. This was the announcement of my discovery of Flexomornis howei, the oldest bird in North America. On the left is Dr. Ron Tykoski, Chief Fossil Preparator for the MNS. On the right is Dr. Tony Fiorillo, Curator of the MNS.";    
  }
]);

