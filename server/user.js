
module.exports = function(app, db, collection, handleError) {

  app.post('/api/register', function(req, res) {
    var msg;

    if !(req.body.username &&
         req.body.password &&
         req.body.passwordConf) {
      msg = 'wrond credentials';
      handleError(res, msg, msg, 400);
    }

    if (req.body.password !==
        req.body.passwordConf) {
      msg = 'passwords didnt match';
      handleError(res, msg, msg, 406);
    }

    let userData = {
      username: req.body.username,
      password: req.body.password,
      role: 'user'
    }

    db.collection(collection).insertOne(userData, function(err, doc) {
      if (err) {
        handleError(res, err.message, 'Failed to create new user');
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  });
}