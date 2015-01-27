var mongoose = require('mongoose');


beforeEach(function (done) {

 function clearDB() {
   for (var i in mongoose.connection.collections) {
     mongoose.connection.collections[i].remove(function() {});
   }
   return done();
 }

 if (mongoose.connection.readyState === 0) {
   mongoose.connect('mongodb://admin:upstarter@053438.mongolab.com:53438/upstarter_test');
   var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      console.log("connection open");
      return done()
      // return clearDB();
    });
  } else {
    return done();
//     return clearDB();
  }
// });

  afterEach(function (done) {
   mongoose.disconnect();
   return done();
  });


});
