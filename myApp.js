var express = require('express');
var app = express();

app.get("/", (req, res) => res.sendFile (__dirname + "/views/index.html"))
app.get ("/json", (req, res)=> res.json({"message": "hello json"}))

































module.exports = app;
