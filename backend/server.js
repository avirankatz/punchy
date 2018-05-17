const express = require("express");
const bodyparser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoUrl= "mongodb://<dbuser>:<dbpassword>@ds227570.mlab.com:27570/punchcard";
const dbName = "punchcard";

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.listen(3010, () => console.log("App is listening on port 3010!"));