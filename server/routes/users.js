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


user.post('/join', async function (req,res){//creates user if not existing
    var queryConfig = {
        text: 'INSERT INTO users(username,password,salt) VALUES($1,$2,$3);',
        values: [req.body.username,req.body.password,req.body.salt]
    }
        pool.query(queryConfig,function(err,result){
            if (err) {
                console.log(err)
                res.json([{message:'username already exists'}]);
                throw err;
            }
            else{
                console.log('USER CREATED')
                res.json([{message:'CREATED'}])
            }
        })  
});


user.get('/login',async function(req,res){
    if(req.session.isLoggedIn){
        res.json('User is logged in')
    }
    else{
        res.json('User is not logged in')
    }
})

user.post('/login', async function(req,res,err){
    const {username, password} = req.body;
    var qConfig = {
        text:'SELECT username,password,salt FROM users WHERE username=$1;',
        values: [username]
    }
    try{
        var {rows} = await pool.query(qConfig)
        var attempt = await bcrypt.hash(password,rows[0].salt)
        console.log('success')
        console.log(rows[0].username)
        if(rows[0].password == attempt){
            console.log('user logged in')
            req.session.isLoggedIn = true;
            req.session.username = username
            res.status(200).json([{message:'Login'}]);
        }
        else{
            res.status(200).json([{message:'Wrong password or username'}]);
        }
    }catch(e){
        console.log(e)
        res.status(400).json([{message:'Wrong password or username'}])
        throw e;
    }
});
module.exports = user;