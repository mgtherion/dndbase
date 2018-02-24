const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const async = require('async');
const ObjectID = mongodb.ObjectID;

const RACES_COLLECTION = 'races';
const CLASSES_COLLECTION = 'classes';
const SKILLS_COLLECTION = 'skills';
const ITEMS_COLLECTION = 'items';

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




/* '/api/items'
 *  GET: get all items
 *  POST: create a new item
 */

app.get('/api/items', function(req, res) {
    db.collection(ITEMS_COLLECTION).find({}).toArray(function(err, docs) {
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

    db.collection(ITEMS_COLLECTION).insertOne(newItem, function(err, doc) {
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
    db.collection(ITEMS_COLLECTION).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
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

    db.collection(ITEMS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to update item');
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete('/api/items/:id', function(req, res) {
    db.collection(ITEMS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to delete item');
        } else {
            res.status(200).json(req.params.id);
        }
    });
});

/* '/api/enchantments'
 *  GET: get all enchantments
 *  POST: create a new enchantment
 */

app.get('/api/enchantments', function(req, res) {
    db.collection(ITEMS_COLLECTION).find({}).toArray(function(err, docs) {
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

    db.collection(ITEMS_COLLECTION).insertOne(newItem, function(err, doc) {
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
    db.collection(ITEMS_COLLECTION).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
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

    db.collection(ITEMS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to update enchantment');
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete('/api/enchantments/:id', function(req, res) {
    db.collection(ITEMS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to delete enchantment');
        } else {
            res.status(200).json(req.params.id);
        }
    });
});

app.get('/api/search', function(req, res) {
    let query = req.query.query;

    db.collection(CLASSES_COLLECTION).ensureIndex({name: 'text', description: 'text'});
    db.collection(SKILLS_COLLECTION).ensureIndex({name: 'text', description: 'text'});
    db.collection(ITEMS_COLLECTION).ensureIndex({name: 'text', description: 'text'});

    function singleQuery(collectionName, cb) {
        db.collection(collectionName)
          .find({$text: {$search: query}})
          .toArray(function(err, docs) {
            if (err) {
                handleError(res, err.message, err.message);
            } else {
                cb(null, docs);
            }
          });
    }

    async.parallel([
        function(cb) {
            db.collection(RACES_COLLECTION).ensureIndex({name: 'text', description: 'text'});

            db.collection(RACES_COLLECTION)
              .find({$text: {$search: query}})
              .toArray(function(err, docs) {
                if (err) {
                    handleError(res, err.message, err.message);
                } else {
                    cb(null, docs);
                }
              });
        },
        /*function(cb) {
            singleQuery(CLASSES_COLLECTION, cb);
        },
        function(cb) {
            singleQuery(SKILLS_COLLECTION, cb);
        },
        function(cb) {
            singleQuery(ITEMS_COLLECTION, cb);
        }*/
    ],
    function(err, results) {
        if (err) {
            handleError(res, err.message, err.message);
        } else {
            console.log('!!!!!!!!', results);
            res.status(200).json({results: results});
        }
    })
});
