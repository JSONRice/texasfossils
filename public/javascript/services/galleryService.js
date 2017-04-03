angular.module('texasfossils').service('GalleryService', [function () {

    /**
     * Format the metadata image object to an ng-image-gallery compatible list.
     * See the metadata image Mongoose schema under models on the server side of the codebase.
     * 
     * This data needs to be formatted into an ng-image-gallery compatible format example:
     * 
     * 
     * // inside your app controller
     * $scope.images = [
     * {
     *   id : 1,
     *   title : 'This is amazing photo of nature',
     *   alt : 'amazing nature photo',
     *   thumbUrl : 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793__340.jpg',
     *   url : 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793_960_720.jpg',
     *   extUrl : 'http://mywebsitecpm/photo/1453793'
     * },
     * {
     *  id : 2,
     *  url : 'https://pixabay.com/static/uploads/photo/2016/06/10/22/25/ortler-1449018_960_720.jpg',
     *  deletable : true,
     * },
     * {
     *  id : 3,
     *  thumbUrl : 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701__340.jpg',
     *  url : 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701_960_720.jpg'
     * }
     *];
     * 
     * 
     * @param {type} metaimagedata
     * @returns {Array} formatted meta-image data 
     */
    this.formatGalleryImageMetadata = function (metaImageData) {
      var formattedMetaImageData = [];
      var id = 1;
      for (var i in metaImageData) {
        var current = metaImageData[i];
        console.log('current:');
        console.log(current);
        formattedMetaImageData.push({
          "id": id++,
          "url": current.metadata.file_path + '/' + current.name,
          "title": current.name,
          "thumbUrl": current.metadata.file_path + '/' + current.name,
        })
      }
      return formattedMetaImageData;
    };

  }
]);