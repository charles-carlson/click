var express = require('express');
var bodyParser = require('body-parser');
var pool = require('./config/db').getPool()
var session = require('express-session')
var pgSession = require('connect-pg-simple')(session);
var os = require('os')
var app = express();
var userRouter = require('./routes/users')
var scoreRouter = require('./routes/score')
var moneyRouter = require('./routes/coins')
require('dotenv').config()

var schema = 'carlso13';
var repo = 'mca_s20_click';


app.use(require('cookie-parser')())
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
    })
);




app.use('/',userRouter);
app.use('/score',scoreRouter)
app.use('/money',moneyRouter)

pool.on('connect', client =>{
    client.query(`SET search_path = ${repo},${schema},public`)
});
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

var interfaces = os.networkInterfaces();
var addresses = [];
for(var i in interfaces){
    for(var i2 in interfaces[i]){
        var address = interfaces[i][i2];
        if(address.family === 'IPv4' && !address.internal){
            addresses.push(address.address);
        }
    }
}
console.log('IP addresses: ' + addresses);
module.exports = app;
