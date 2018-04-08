
module.exports = function(app, db, collection, handleError) {

  /* '/api/races'
   *  GET: get all races
   *  POST: create a new race
   */

  app.get('/api/races', function(req, res) {
      db.collection(collection).find({}).toArray(function(err, docs) {
          if (err) {
              handleError(res, err.message, 'Failed to get races');
          } else {
              res.status(200).json(docs);
          }
      });
  });

  app.post('/api/races', function(req, res) {
      let newRace = req.body;
      newRace.createDate = new Date();

      if (!req.body.name) {
          handleError(res, 'Invalid race input', 'Must provide a name', 400);
      }

      db.collection(collection).insertOne(newRace, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to create new race');
          } else {
              res.status(201).json(doc.ops[0]);
          }
      });
  });

  /* '/api/races/:id'
   *  GET: get race by id
   *  PUT: update race by id
   *  DELETE: delete race by id
   */

  app.get('/api/races/:id', function(req, res) {
      db.collection(collection).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to get race');
          } else {
              res.status(200).json(doc);
          }
      });
  });

  app.put('/api/races/:id', function(req, res) {
      var updateDoc = req.body;
      delete updateDoc._id;

      db.collection(collection).updateOne({ _id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to update race');
          } else {
              updateDoc._id = req.params.id;
              res.status(200).json(updateDoc);
          }
      });
  });

  app.delete('/api/races/:id', function(req, res) {
      db.collection(collection).deleteOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to delete race');
          } else {
              res.status(200).json(req.params.id);
          }
      });
  });

}