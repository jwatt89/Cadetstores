var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/UniformAdmin";

dbo = MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database connected");
    if (err) throw err;
   var dbo = db.db("uniformadmin");
    dbo.createCollection("cadets", function(err, res) {
      if (err) throw err;
      console.log("Cadets Collection created!");
      db.close();
    });
    dbo.createCollection("UniformItems", function(err, res) {
        if (err) throw err;
        console.log("Uniform Items Collection created!");
        db.close();
      });
      dbo.createCollection("scores", function(err, res) {
        if (err) throw err;
        console.log("Scores Collection created!");
        db.close();
      });
      dbo.createCollection("UniformDemand", function(err, res) {
        if (err) throw err;
        console.log("Uniform Demand Collection created!");
        db.close();
      });
      dbo.createCollection("ScoresComments", function(err, res) {
        if (err) throw err;
        console.log("Scores Comments Collection created!");
        db.close();
      });

      
  });