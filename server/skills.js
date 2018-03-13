
module.exports = function(app, db, collection) {

  /* '/api/skills'
   *  GET: get all skills
   *  POST: create a new skill
   */

  app.get('/api/skills', function(req, res) {
      db.collection(collection).find({}).toArray(function(err, docs) {
          if (err) {
              handleError(res, err.message, 'Failed to get skills');
          } else {
              res.status(200).json(docs);
          }
      });
  });

  app.post('/api/skills', function(req, res) {
      let newSkill = req.body;
      newSkill.createDate = new Date();

      if (!req.body.name) {
          handleError(res, 'Invalid skill input', 'Must provide a name', 400);
      }

      db.collection(collection).insertOne(newSkill, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to create new skill');
          } else {
              res.status(201).json(doc.ops[0]);
          }
      });
  });

  /* '/api/skills/:id'
   *  GET: get skill by id
   *  PUT: update skill by id
   *  DELETE: delete skill by id
   */

  app.get('/api/skills/:id', function(req, res) {
      db.collection(collection).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to get skill');
          } else {
              res.status(200).json(doc);
          }
      });
  });

  app.put('/api/skills/:id', function(req, res) {
      var updateDoc = req.body;
      delete updateDoc._id;

      db.collection(collection).updateOne({ _id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to update skill');
          } else {
              updateDoc._id = req.params.id;
              res.status(200).json(updateDoc);
          }
      });
  });

  app.delete('/api/skills/:id', function(req, res) {
      db.collection(collection).deleteOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
          if (err) {
              handleError(res, err.message, 'Failed to delete skill');
          } else {
              res.status(200).json(req.params.id);
          }
      });
  });

}