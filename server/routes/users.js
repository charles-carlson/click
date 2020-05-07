var express = require('express');
var user = express.Router();
var pool = require('../config/db').getPool()
var session = require("express-session"); 
var passport = require('passport')
var bcrypt = require('bcrypt')


user.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

user.get('/join', async function(req,res){//gets page for creating user
    res.sendStatus(200);
})


user.post('/join', async function (req,res){//creates user if not existing
    const salt = bcrypt.genSaltSync(10);
    bcrypt.hash(req.body.password,salt,function(err,res){
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
                    res.sendStatus(401)
                }
                else{
                    res.sendStatus(200)
                }
            })
            }
        });

    });


user.get('/login',async function(req,res){
    if(req.isAuthenticated()){
        res.sendStatus(200)
    }
    else{
        res.sendStatus(401)
    }
})

user.post('/login', passport.authenticate('local'),
    function(err,req,res){
        if(err){
            console.log(err);s
        }
        else{
            if(req.body.remember){
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
            }
            else{
                req.session.cookie.expires();
            }
            res.sendStatus(200)
        }   
});

module.exports = user;