var express = require('express');
var bodyParser = require('body-parser');
var os = require('os')
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

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
