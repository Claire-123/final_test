const express = require('express')
const bodyParser = require('body-parser')
const nedb = require('@seald-io/nedb')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const nedbSessionStore = require('nedb-promises-session-store')
const bcrypt = require('bcrypt')
const path = require('path')

let database = new nedb({
    filename: "database.txt",
    autoload: true,
})

const urlEncodedParser = bodyParser.urlencoded({extended: true})

const nedbSessionInit = nedbSessionStore({
    connect: expressSession,
    filename: 'sessions.txt'
})

let userdatabase = new nedb({
    filename: 'userdb.txt',
    autoload: true
})

const app = express()

app.use(express.static("public"))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

app.use(urlEncodedParser)
app.use(cookieParser())
app.set('view engine', 'ejs')

app.use(expressSession({
    store: nedbSessionInit,
    cookie:{
        maxAge: 365*24*60*60*1000
    },
    secret: 'supersecret123'
}))

app.get('/', (req, res)=>{
    res.render('gate.ejs')
})

app.listen(3333, ()=>{
    console.log('http://localhost:3333')
    console.log(path.join(__dirname, 'node_modules/three/build'))
    console.log(path.join(__dirname, 'node_modules/three/examples/jsm'))
})