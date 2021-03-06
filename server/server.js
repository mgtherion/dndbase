const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const async = require('async');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
//const redisConfig = require('./redis-config');
//const ObjectID = mongodb.ObjectID;

const RACES_COLLECTION = 'races';
const CLASSES_COLLECTION = 'classes';
const SKILLS_COLLECTION = 'skills';
const ITEMS_COLLECTION = 'items';
const ENCHANTMENTS_COLLECTION = 'enchantments';

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist'));

/*app.use(session({
    store: new RedisStore({
        url: redisConfig.redisStore.url
    }),
    secret: redisConfig.redisStore.secret,
    resave: false,
    saveUninitialized: false
}));*/

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

    require('./races.js')(app, db, RACES_COLLECTION, handleError);
    require('./classes.js')(app, db, CLASSES_COLLECTION, handleError);
    require('./skills.js')(app, db, SKILLS_COLLECTION, handleError);
    require('./items.js')(app, db, ITEMS_COLLECTION, handleError);
    require('./enchants.js')(app, db, ENCHANTMENTS_COLLECTION, handleError);

});

function handleError(res, reason, message, code) {
    console.log('ERROR: ' + reason);
    res.status(code || 500).json({'error': message});
}

app.post('/api/login', function(req, res) {
    res.status(200).json({'token': 123456789});
});

app.get('/api/search', function(req, res) {
    let query = req.query.query;

    function singleQuery(collectionName, cb) {
        db.collection(collectionName).ensureIndex({name: 'text', description: 'text'});

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
            singleQuery(RACES_COLLECTION, cb);
        },
        function(cb) {
            singleQuery(CLASSES_COLLECTION, cb);
        },
        function(cb) {
            singleQuery(SKILLS_COLLECTION, cb);
        },
        function(cb) {
            singleQuery(ITEMS_COLLECTION, cb);
        },
        function(cb) {
            singleQuery(ENCHANTMENTS_COLLECTION, cb);
        }
    ],
    function(err, results) {
        if (err) {
            handleError(res, err.message, err.message);
        } else {
            res.status(200).json({
                races: results[0],
                classes: results[1],
                skills: results[2],
                items: results[3],
                enchantments: results[4]
            });
        }
    })
});
