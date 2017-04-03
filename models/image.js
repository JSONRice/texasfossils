var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Representation of a metaimage model from the Mongo database. Images are
 * represented logically via metadata with the actual images residing on
 * the web server's file system for remote retrieval. Generally the images
 * should either be a few test images stored on localhost (user's system) or
 * a remote server. See routes/api.js
 * 
 * @type type
 */
var image = new Schema({
  metadata: {
    caption: String,
    upload_date: {
      type: Date,
      default: Date.now,
      required: false
    },
    file_path: {
      type: String,
      required: true,
      unique: false
    }
  },
  name: { // full name excluding the path (must have file extension to work properly)
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('images', image);