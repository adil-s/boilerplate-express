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
    let now = new Date()
    now.setSeconds(new Date().getSeconds() + 20)

    req.time = now;
    next()
},
    function (req, res) {
        return res.json({ 'time': req.time.toDateString() })
    }
)































module.exports = app;
