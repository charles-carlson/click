var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session')
var os = require('os')
var app = express();
var userRouter = require('./routes/users')
var passport = require('passport')
var localStrategy = require('./config/passport')
var pool = require('./config/db').getPool()
var schema = 'carlso13';
var repo = 'mca_s20_click';

passport.use('local',localStrategy)
app.use(require('cookie-parser')())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({secret:'project'}))
app.use(passport.initialize());
app.use(passport.session());


app.use('/',passport.authenticate('local',{session:false}),userRouter);

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
