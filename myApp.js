var express = require('express');
var app = express();

app.use((req, rres, next) => {
    //console.log(`$req.method, req.path, " - ", req.ip`);
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
})

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"))
app.get("/json", (req, res) => res.json({ "message": "hello json" }))
app.get("/json/v3", (req, res) => res.json({ "msg": "hello json" }))
app.get("/now", (req, res, next) => {
        req.time =  new Date().toDateString()
        next()
    },
    function(req, res){
        return res.json({'time': req.time})
    }
)































module.exports = app;
