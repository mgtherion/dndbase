
module.exports = function(app, db, collection, handleError) {

  /* '/api/items'
   *  GET: get all items
   *  POST: create a new item
   */

  app.get('/api/items', function(req, res) {
      db.collection(collection).find({}).toArray(function(err, docs) {
          if (err) {
              handleError(res, err.message, 'Failed to get items');
          } else {
              res.status(200).json(docs);
          }
      });
  });

  app.post('/api/items', function(req, res) {
      let newItem = req.body;
      newItem.createDate = new Date();

      if (!req.body.name) {
          handleError(res, 'Invalid item input', 'Must provide a name', 400);
      }

      db.collection(collection).insertOne(newItem, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to create new item');
          } else {
              res.status(201).json(doc.ops[0]);
          }
      });
  });

  /* '/api/items/:id'
   *  GET: get item by id
   *  PUT: update item by id
   *  DELETE: delete item by id
   */

  app.get('/api/items/:id', function(req, res) {
      db.collection(collection).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to get item');
          } else {
              res.status(200).json(doc);
          }
      });
  });

  app.put('/api/items/:id', function(req, res) {
      var updateDoc = req.body;
      delete updateDoc._id;

      db.collection(collection).updateOne({ _id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to update item');
          } else {
              updateDoc._id = req.params.id;
              res.status(200).json(updateDoc);
          }
      });
  });

  app.delete('/api/items/:id', function(req, res) {
      db.collection(collection).deleteOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to delete item');
          } else {
              res.status(200).json(req.params.id);
          }
      });
  });
}