var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
})
app.use(bodyParser.urlencoded({ 'extended': 'false' }))
app.use(bodyParser.json())
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
        return res.send({ 'time': req.time.toString() })
    }
)
app.get("/:word/echo", (req, res) => {
    return res.json({ 'echo': req.params.word });
})
app.route("/name").get((req, res) => {
    return res.json({ 'name': `${req.query.first} ${req.query.last}` })
})





























module.exports = app;
