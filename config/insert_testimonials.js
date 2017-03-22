/**
 * Insert testimonials from the previous web app.
 * 
 * Warning: this script deletes every document in the testimonials collection.
 * 
 * To run from the command line:
 * 
 * > mongo insert_testimonials.js 
 */

var dbName = 'texasfossils';

function connect(pDbName) {
  var mongo = new Mongo();
  var instance = mongo.getDB(pDbName);
  print('Switching over from default db to db: ' + pDbName);
  return instance;
}

var db = connect(dbName);

// truncate:
db.testimonials.remove({});

var testimonials = [
  {
    author: 'Dr. Ron Tykoski',
    authorOccupation: 'Vertebrate Paleontologist',
    text: "I've been interacting with Kris for about five years now, and in that time his skills in handling and prepping fossils have continued to impress me. From delicate, crumbly, chalky bones of fish and birds, to multi-hundred pound slabs of weakly solidified mudstones and shales, he has demonstrated an instinctive ability to care for, prepare, and preserve fossil specimens. I've been impressed by his preparation work, and by his commitment to see to it that important vertebrate specimens that he personally found made their way to an appropriate repository so they could enter the scientific record and public domain. Well done Kris!"
  },
  {
    author: 'Angelos Matheau-Raven',
    authorOccupation: 'UK Fossil Dealer',
    text: "Kris is always a pleasure to deal with and his prepared fossils are of the best quality. We have been friends and business associates for over a decade. He has a wealth of knowledge and is always happy to be extremely helpful and informative. Kris is a refreshing person full of enthusiasm and commitment to the expanse of palaeontological discoveries. His life is bound by a strict code of morals and ethics, something he adheres to whilst on field trips hunting for fossils. A recent fossil cretaceous bird found by him has been named in his honour Flexocormis howei and now resides at his local museum. Kris has my highest recommendations."
  }
];

// insert documents in collection
for (var i in testimonials) {
  db.testimonials.insert(testimonials[i]);
}
