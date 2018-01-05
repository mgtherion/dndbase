const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

const RACES_COLLECTION = 'races';

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log('Database connection ready');

    var server = app.listen(process.env.PORT || 8800, function() {
        var port = server.address().port;
        console.log('App now running on port ', port);
    });
});

function handleError(res, reason, message, code) {
    console.log('ERROR: ' + reason);
    res.status(code || 500).json({'error': message});
}

/* '/api/races'
 *  GET: get all races
 *  POST: create a new race
 */

app.get('/api/races', function(req, res) {
    db.collection(RACES_COLLECTION).find({}).toArray(function(err, docs) {
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

    db.collection(RACES_COLLECTION).insertOne(newRace, function(err, doc) {
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
    db.collection(RACES_COLLECTION).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
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

    db.collection(RACES_COLLECTION).updateOne({ _id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to update race');
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete('/api/races/:id', function(req, res) {
    db.collection(RACES_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to delete race');
        } else {
            res.status(200).json(res.params.id);
        }
    });
});

//const express = require('express');
//const app = express();
//app.use(express.static(__dirname + '/dist'));
//app.listen(process.env.PORT || 8800);
