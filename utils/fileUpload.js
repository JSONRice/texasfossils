var fs = require('fs');

FileUploadController = function () {
};

FileUploadController.prototype.uploadFile = function (req, res) {
  // We are able to access req.files.file thanks to 
  // the multiparty middleware that was passed in via routes (api.js)
  var file = req.files.file;
  var originalPath = req.files.file.path;

  /**
   * The following is a bit of a hack. Please do not mess 
   * with it or functionality will be lost. This is built for the
   * ng-file-upload because when upload is invoked it dumps the binary
   * as a blob to the server without specifying the path so the server
   * will drop the file somewhere such as /tmp What's worse is a random
   * file name is chosen. That being said the following will take the
   * file that was dumped read its contents then copy it to the specified
   * loaction. This works but is fragile and the ng-file-upload needs to
   * have a way to override the path and name. This is a work around.
   */
  fs.readFile(originalPath, function (err, data) {
    // set the correct path for the file not the temporary one from the API:
    file.path = "/media/images/" + file.name;
    
    fs.writeFile(file.path, data, function (err) {
      if (err) {
        return console.warn(err);
      }
      console.log("The file: " + file.name + " was saved to " + file.path);
      // If the image isn't stored under /media/images/ then delete it.
      if (!originalPath.match(/^\/media\/images\//)) {
        fs.unlink(originalPath, function(err) {
          if (err) {
            return console.warn(err);
          }
          console.log("The temporary file: " + originalPath + " was deleted.");
        });
      }
    });
  });

  res.json({message: 'uploaded'});
  return res;
};

module.exports = new FileUploadController();
