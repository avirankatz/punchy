const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;
// const mongoUrl = "mongodb://sofi:g00dT3ch!@ds227570.mlab.com:27570/punchcard";
// const dbName = "punchcard";
const mongoUrl = "mongodb://sofi:g00dT3ch!@ds141870.mlab.com:41870/punchcard-dev";
const dbName = "punchcard-dev";

app.use(cors());
app.use(express.static('../dist'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.post('/punch', (req, res) => {
    let username = req.body.username;
    let project = req.body.project;
    let isDirectionIn = req.body.isDirectionIn;
    let time = req.body.time;
    if (!username || isDirectionIn == null || (isDirectionIn && !project)) res.status(400);
    else {
        savePunch(isDirectionIn, username, project, time);
    }
    res.json({ status: res.statusCode });
});
app.get('/sessions', (req, res) => {
    MongoClient.connect(mongoUrl, (err, client) => {
        let db = client.db(dbName);
        db.collection('sessions').find().toArray((error, result) => {
            res.json(result);
        });
    })
});
app.get('/users-and-projects', (req, res) => {
    MongoClient.connect(mongoUrl, (err, client) => {
        let db = client.db(dbName);
        db.collection('users').find().toArray()
            .then(userDocs => {
                db.collection('projects').find().toArray().then(projectDocs => {
                    res.json({ users: userDocs, projects: projectDocs });
                });
            });
    });
});
app.post('/user', (req, res) => {
    let user = req.body;
    MongoClient.connect(mongoUrl).then(client => {
        let db = client.db(dbName);
        db.collection('users').findOneAndUpdate({ username: user.username }, { $set: user }, { upsert: true })
            .then(result => res.json('user added successfully.'))
            .catch(err => res.json(err));
    });
});
app.get('/users', (req, res) => {
    MongoClient.connect(mongoUrl).then(client => {
        client.db(dbName).collection('users').find().toArray()
            .then(docs => res.json(docs))
            .catch(err => res.json(err));
    });
});
app.post('/project', (req, res) => {
    let project = req.body;
    MongoClient.connect(mongoUrl).then(client => {
        let db = client.db(dbName);
        db.collection('projects').findOneAndUpdate({ slug: project.name }, { $set: project }, { upsert: true })
            .then(result => res.json('project added successfully.'))
            .catch(err => res.json(err));
    });
});
app.post('/remove-project', (req, res) => {
    let projectName = req.body.name;
    MongoClient.connect(mongoUrl).then(client => {
        let db = client.db(dbName);
        db.collection('projects').deleteOne({ slug: projectName })
            .then(result => res.json('project deleted successfully.'))
            .catch(err => res.json(err));
    });
});
app.get('/active-session', (req, res) => {
    let username = req.query.username;
    MongoClient.connect(mongoUrl).then(client => {
        let db = client.db(dbName);
        db.collection('activeSessions').findOne({username: username}).then(result => {
            res.json(result);
        });
        client.close();
    });
});

/**
 * Create a new session for the punch. 
 * If the user has an existing session, punch out of it and move it to sessions collection.
 * @param {boolean} isDirectionIn direction of punch. true = in; false = out
 * @param {string} username user who punched in
 * @param {string} project project that was punched in
 * @param {string} time time of punch
 */
function savePunch(isDirectionIn, username, project, time) {
    let now = time ? time : new Date().toJSON();
    MongoClient.connect(mongoUrl, (err, client) => {
        let db = client.db(dbName);
        let activeSessionsCollection = db.collection('activeSessions');
        activeSessionsCollection.findOneAndDelete({ username: username }, (err, result) => {
            if (result.value != null) {
                let session = result.value;
                session.out = now;
                db.collection('sessions').insertOne(session).then(() => {
                    if (isDirectionIn)
                        createNewSession(username, project, now, activeSessionsCollection);
                });
            } else if (isDirectionIn) {
                createNewSession(username, project, now, activeSessionsCollection);
            }
        });
    });
}

/**
 * Inserts a new session to active sessions collection
 * @param {string} username user of session
 * @param {string} project project of session
 * @param {String} punchInTime punch in time in json format
 * @param {any} activeSessionsCollection Monngo collection of active sessions
 */
function createNewSession(username, project, punchInTime, activeSessionsCollection) {
    activeSessionsCollection.insertOne({
        username: username,
        project: project,
        in: punchInTime
    });
}

app.listen(3020, () => console.log("App is listening on port 3020!"));
