
module.exports = function(app, db, collection, handleError) {

  /* '/api/enchantments'
   *  GET: get all enchantments
   *  POST: create a new enchantment
   */

  app.get('/api/enchantments', function(req, res) {
      db.collection(collection).find({}).toArray(function(err, docs) {
          if (err) {
              handleError(res, err.message, 'Failed to get enchantments');
          } else {
              res.status(200).json(docs);
          }
      });
  });

  app.post('/api/enchantments', function(req, res) {
      let newItem = req.body;
      newItem.createDate = new Date();

      if (!req.body.name) {
          handleError(res, 'Invalid enchantment input', 'Must provide a name', 400);
      }

      db.collection(collection).insertOne(newItem, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to create new enchantment');
          } else {
              res.status(201).json(doc.ops[0]);
          }
      });
  });

  /* '/api/enchantments/:id'
   *  GET: get enchantment by id
   *  PUT: update enchantment by id
   *  DELETE: delete enchantment by id
   */

  app.get('/api/enchantments/:id', function(req, res) {
      db.collection(collection).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to get enchantment');
          } else {
              res.status(200).json(doc);
          }
      });
  });

  app.put('/api/enchantments/:id', function(req, res) {
      var updateDoc = req.body;
      delete updateDoc._id;

      db.collection(collection).updateOne({ _id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to update enchantment');
          } else {
              updateDoc._id = req.params.id;
              res.status(200).json(updateDoc);
          }
      });
  });

  app.delete('/api/enchantments/:id', function(req, res) {
      db.collection(collection).deleteOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to delete enchantment');
          } else {
              res.status(200).json(req.params.id);
          }
      });
  });


}