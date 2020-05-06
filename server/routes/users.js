var express = require('express');
var user = express.Router();
var pool = require('../config/db').getPool()
var session = require("express-session"); 
var passport = require('../config/passport')
var bcrypt = require('bcrypt')

var schema = 'carlso13';
var repo = 'mca_s20_click';
pool.on('connect', client =>{
    client.query(`SET search_path = ${repo},${schema},public`)
});
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

user.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

user.get('/join', async function(req,res){//gets page for creating user
    res.sendStatus(200);
})


user.post('/join', async function (req,res){//creates user if not existing
    const salt = bcrypt.genSaltSync(10);
    console.log(req.body.username)
    bcrypt.hash(req.body.password,salt,function(err,res){
        console.log(req.body.username)
        if(err){
            console.error(err);
        }
        else{
            var queryConfig = {
                text: 'INSERT INTO users(username,password) VALUES($1,$2);',
                values: [req.body.username,res]
            }
            pool.query(queryConfig,function(err,res){
                if (err) {
                    console.error(err);
                }
                else{
                    console.log('CREATED USER')
                    res.redirect('/login')
                }
            })
            }
        }); 
    });


user.get('/login',async function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    else{
        res.redirect('/login')
    }
})

user.post('/login', passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect: '/login'
    }),
    function(req,res){
        if(req.body.remember){
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        }
        else{
            req.session.cookie.expires();
        }
    res.redirect('/');
});

module.exports = user;