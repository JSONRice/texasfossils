// Controller (API) Route File

var ioc = require('electrolyte');
var router = ioc.create('router');
var passport = require('passport');
var user = require('../models/user.js');
var image = require('../models/image.js');
var testimonial = require('../models/testimonial.js');

// To test route run: 
// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"username": "test@test.com", "pword": "test"}' http://localhost:8000/api/register
// Note if test fails ensure port is the startup port from the NodeJS config file (app.js)
/*
router.post('/register', function (req, res) {
  console.log('/register');
  user.register(new user({username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname}), req.body.password, function (err, account) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});
*/

// To test route:
// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"username": "test@test.com", "password": "test"}' http://localhost:8000/api/login
// Note if test fails ensure port is the startup port from the NodeJS config file (app.js)
router.post('/login', function (req, res, next) {
  console.log('/login');
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    else if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

// To test route:
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://<IPv4|domain>:<port>/api/logout
// Note if test fails ensure port is the startup port from the NodeJS config file (app.js)
router.get('/logout', function (req, res) {
  console.log('/logout');
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

////
// Retrieve a single user (doc) from the Mongo user collection
// To test on command line:
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://<IPv4|domain>:<port>/api/users
//
// To test in browser:
// http://localhost:8000/api/users
////
router.get('/users', function (req, res) {
  console.log('/users');
  user.find(function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

////
// Retrieve a single user (doc) from the Mongo user collection
// To test on command line:
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://<IPv4|domain>:<port>/api/findUser/test@test.com
//
// To test in browser:
// http://localhost:8000/api/findUser/test@test.com
////
router.get('/findUser/:username', function (req, res) {
  console.log('/findUser/:username');
  user.findOne({username: req.params.username}, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

////
// Retrieve all image metadata document from the Mongo images collection
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://<IPv4|domain>:<port>/api/images
////
router.get('/images', function (req, res) {
  console.log('/images');
  image.find({}, function (err, images) {
    if (err) {
      res.send(err);
    }

    var imageMap = {};

    images.forEach(function(image) {
      imageMap[image._id] = image;
    });

    res.send(imageMap);    
  });
});

////
// Retrieve all image documents from the Mongo images collection that are based on a file type (extension)
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://<IPv4|domain>:<port>/api/images/ext/jpg
////
router.get('/images/ext/:file_type', function (req, res) {
  console.log('/images/ext/:file_type');
  image.find({name: req.params.file_type}, function (err, image) {
    if (err) {
      res.send(err);
    }
    res.json(image);
  });
});

////
// Retrieve a single image documents from the Mongo images collection
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://<IPv4|domain>:<port>/api/images/name/aboutme.jpg
////
router.get('/images/name/:name', function (req, res) {
  console.log('/images/:name');
  image.findOne({name: req.params.name}, function (err, image) {
    if (err) {
      res.send(err);
    }
    res.json(image);
  });
});

////
// Retrieve all testimonial documents from the Mongo testimonials collection.
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://<IPv4|domain>:<port>/api/testimonials
//
////
router.get('/testimonials', function (req, res) {
  testimonial.find(function (err, testimonial) {
    if (err) {
      res.send(err);
    }
    res.json(testimonial);
  });
});

////
// Upload a single testimonial entry to Mongo.
// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"email": "test@test.com", "author": "Fred Flintstone", "title": "Rock Hound", "text": "I love Mr. Howe's attention to detail. He is the the best!"}' http://<domain|IPv4>:<port>/api/testimonials
//
////
router.post('/testimonials', function (req, res) {
  var newTestimonial = new testimonial(req.body);
  newTestimonial.save(function (err) {
    if (err)
      res.send(err);

    res.json({message: 'uploaded'});
  });
});

module.exports = router;
