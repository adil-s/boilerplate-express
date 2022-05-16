var createClient = require('redis').createClient
const client = createClient({url: "redis://redis:6379"});
async function redis_init() {
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
}
async function redis_set(key, val) {
    await client.set(key, val);
}
async function redis_get(key) {
    console.log("in redis get: ", key)
    return { [key]: await client.get(key) }
}
redis_init()
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
app.get("/redis/get", (req, res) => {
    if (req.query.key != undefined) {
        redis_get(req.query.key).then(val => res.json(val)).catch(_ => res.json({ 'message': "something went wrong!" }))
    } else {
        return res.json({
            "message": "key not found!"
        })
    }
})
app.get("/redis/set", (req, res) => {
    console.log(req.query)
    redis_set(req.query.key, req.query.val).then(val => res.json({ 'message': 'OK' })).catch(_=> {
        return res.json({ 'message': 'failed!' })
    })
})
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

const fullNameRes = (req, res) => {
    return res.json({ 'name': `${req.query.first} ${req.query.last}` })
}
app.route("/name").get(fullNameRes).post((req, res) => {
    return res.json({ 'name': `${req.body.first} ${req.body.last}` })
})




























module.exports = app;
