var fs = require('fs');

FileUploadController = function () {};

FileUploadController.prototype.uploadFile = function (req, res) {
  // We are able to access req.files.file thanks to 
  // the multiparty middleware that was passed in via routes (api.js)
  var file = req.files.file;
  
  // set the correct path for the file not the temporary one from the API:
  file.path = "/media/images/" + file.name;
  console.log(file);
  
  fs.writeFile(file.path, file, function (err) {
    if (err) {
      return console.warn(err);
    }
    console.log("The file: " + file.name + " was saved to " + file.path);
  });
  
  res.json({message: 'uploaded'});
  return res;
};

module.exports = new FileUploadController();
