const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb://sofi:g00dT3ch!@ds227570.mlab.com:27570/punchcard";
const dbName = "punchcard";

app.use(cors());
app.use(express.static('../dist'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.post('/punch', (req, res) => {
    let name = req.body.name;
    let project = req.body.project;
    let isDirectionIn = req.body.isDirectionIn;
    let time = req.body.time;
    if (!name || !project || isDirectionIn == null) res.status(400);
    else {
        savePunch(isDirectionIn, name, project, time);
    }
    res.json({ status: res.statusCode });
});
app.get('/sessions', (req,res) => {
    MongoClient.connect(mongoUrl, (err, client) => {
        let db = client.db(dbName);
        db.collection('sessions').find().toArray((error, result) => {
            res.json(result);
        });
    })
});
app.listen(3010, () => console.log("App is listening on port 3010!"));

/**
 * Create a new session for the punch. 
 * If the user has an existing session, punch out of it and move it to sessions collection.
 * @param {boolean} isDirectionIn direction of punch. true = in; false = out
 * @param {string} name user who punched in
 * @param {string} project project that was punched in
 * @param {string} time time of punch
 */
function savePunch(isDirectionIn, name, project, time) {
    let now = time ? time : new Date().toJSON();
    MongoClient.connect(mongoUrl, (err, client) => {
        let db = client.db(dbName);
        let activeSessionsCollection = db.collection('activeSessions');
        activeSessionsCollection.findOneAndDelete({ name: name }, (err, result) => {
            if (result.value != null) {
                let session = result.value;
                session.out = now;
                db.collection('sessions').insertOne(session).then(() => {
                    if (isDirectionIn)
                        createNewSession(name, project, now, activeSessionsCollection);
                });
            } else if (isDirectionIn) {
                createNewSession(name, project, now, activeSessionsCollection);
            }
        });
    });
}

/**
 * Inserts a new session to active sessions collection
 * @param {string} name user of session
 * @param {string} project project of session
 * @param {String} punchInTime punch in time in json format
 * @param {any} activeSessionsCollection Monngo collection of active sessions
 */
function createNewSession(name, project, punchInTime, activeSessionsCollection) {
    activeSessionsCollection.insertOne({
        name: name,
        project: project,
        in: punchInTime
    });
}
