const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

const RACES_COLLECTION = 'races';
const CLASSES_COLLECTION = 'classes';
const SKILLS_COLLECTION = 'skills';

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
            res.status(200).json(req.params.id);
        }
    });
});





/* '/api/classes'
 *  GET: get all classes
 *  POST: create a new class
 */

app.get('/api/classes', function(req, res) {
    db.collection(CLASSES_COLLECTION).find({}).toArray(function(err, docs) {
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

    db.collection(CLASSES_COLLECTION).insertOne(newClass, function(err, doc) {
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
    db.collection(CLASSES_COLLECTION).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
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

    db.collection(CLASSES_COLLECTION).updateOne({ _id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to update class');
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete('/api/classes/:id', function(req, res) {
    db.collection(CLASSES_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to delete class');
        } else {
            res.status(200).json(req.params.id);
        }
    });
});





/* '/api/skills'
 *  GET: get all skills
 *  POST: create a new skill
 */

app.get('/api/skills', function(req, res) {
    db.collection(SKILLS_COLLECTION).find({}).toArray(function(err, docs) {
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

    db.collection(SKILLS_COLLECTION).insertOne(newSkill, function(err, doc) {
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
    db.collection(SKILLS_COLLECTION).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
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

    db.collection(SKILLS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to update skill');
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete('/api/skills/:id', function(req, res) {
    db.collection(SKILLS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to delete skill');
        } else {
            res.status(200).json(req.params.id);
        }
    });
});
