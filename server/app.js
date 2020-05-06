var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session')
var os = require('os')
var app = express();
var userRouter = require('./routes/users')
var passport = require('passport')
app.use(require('cookie-parser')())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret:'project'}))
app.use('/',userRouter,function(err,result){
    if(err){
        console.error(err)
    }
    else{
        console.log(result)
    }
});
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
