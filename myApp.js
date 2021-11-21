var express = require('express');
var app = express();

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"))
app.get("/json", (req, res) => res.json({ "message": "hello json" }))
app.get("/json/v3", (req, res) => res.json({ "msg": "hello json" }))
app.use((req, rres, next) => {
    console.log(req.method, " ", req.path, " - ", req.ip);
    next();
})
































module.exports = app;
