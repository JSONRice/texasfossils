/**
 * Before executing this script via the command line Mongo utility, make sure the
 * images have been loaded into the filesystem at the defined root_path location.
 * 
 * Warning: this script deletes every document in the images collection.
 * 
 * To run from the command line:
 * 
 * > mongo insert_images.js
 */

// Change this according to where you want to store your images:
var rootPath = '/media/images';
var dbName = 'texasfossils';
var collectionName = 'images';

function connect(pDbName) {
  var mongo = new Mongo();
  var instance = mongo.getDB(pDbName);
  print('Switching over from default db to db: ' + pDbName);
  return instance;
}

var db = connect(dbName);

// truncate:
db.images.remove({});

var image = {
  "metadata": {
    "caption": "Lorem ipsum dolor sit amet, ea has fugit posidonium, summo feugiat officiis his no. Ut invenire quaestio patrioque duo. Hinc tritani sed ei, ei sit tale summo, no sumo vero expetendis pri. In ponderum imperdiet elaboraret vim, sit cu meis omnium periculis.",
    "file_path": rootPath
  }
};

// TODO: add some real captions.

var names = [
  'aboutme.jpg', 'display.jpg', 'favicon.ico', 'flexo_conf_2.jpg', 'flexo_conf_small.jpg',
  'flexo_times_square.jpg', 'green_cup.png', 'kris01.jpg', 'kris02.jpg', 'kris03.jpg', 'leather.png',
  'shell.png', 'swirl_pattern.png', 'texasfossils.png', 'texasfossils_black_2.png', 'texasfossils_white.png',
  'texasfossils_white_2.png', 'xiphactinus_jaws_complete.jpg', 'xiphactinus_jaws_small.jpg', 'xiphactinus_mount.jpg'
];

// insert documents in collection
for (var name in names) {
  image.name = names[name];
  db.images.insert(image);
}


