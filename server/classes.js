
module.exports = function(app, db, collection) {

  /* '/api/classes'
   *  GET: get all classes
   *  POST: create a new class
   */

  app.get('/api/classes', function(req, res) {
      db.collection(collection).find({}).toArray(function(err, docs) {
          if (err) {
              handleError(res, err.message, 'Failed to get classes');
          } else {
              res.status(200).json(docs);
          }
      });
  });

  app.post('/api/classes', function(req, res) {
      let newClass = req.body;
      newClass.createDate = new Date();

      if (!req.body.name) {
          handleError(res, 'Invalid class input', 'Must provide a name', 400);
      }

      db.collection(collection).insertOne(newClass, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to create new class');
          } else {
              res.status(201).json(doc.ops[0]);
          }
      });
  });

  /* '/api/classes/:id'
   *  GET: get class by id
   *  PUT: update class by id
   *  DELETE: delete class by id
   */

  app.get('/api/classes/:id', function(req, res) {
      db.collection(collection).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to get class');
          } else {
              res.status(200).json(doc);
          }
      });
  });

  app.put('/api/classes/:id', function(req, res) {
      var updateDoc = req.body;
      delete updateDoc._id;

      db.collection(collection).updateOne({ _id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to update class');
          } else {
              updateDoc._id = req.params.id;
              res.status(200).json(updateDoc);
          }
      });
  });

  app.delete('/api/classes/:id', function(req, res) {
      db.collection(collection).deleteOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to delete class');
          } else {
              res.status(200).json(req.params.id);
          }
      });
  });

}