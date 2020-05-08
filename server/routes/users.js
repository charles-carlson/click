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
    
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(req.body.password,salt);
    var queryConfig = {
        text: 'INSERT INTO users(username,password) VALUES($1,$2);',
        values: [req.body.username,hash]
    }
    pool.query(queryConfig,function(err,res){
        if (err) {
            console.error(err)
            throw err
        }
        else{
            console.log('USER CREATED')
        }
    })
    res.status(200).send({message:'USER CREATED'});
    });


user.get('/login',async function(req,res){
    if(req.session.isLoggedIn){
        res.sendStatus(200)
    }
    else{
        res.sendStatus(401)
    }
})

user.post('/login', async function(req,res,err){
    const {username, password} = req.body;
    var qConfig = {
        text:'SELECT username,password FROM users WHERE username=$1;',
        values: [username]
    }

    var {rows} = await pool.query(qConfig)
    console.log('success')
    console.log(rows[0].username)
    var IsMatch = await bcrypt.compare(password,rows[0].password)
    console.log(IsMatch)
    if(IsMatch){
        console.log('user logged in')
        req.session.isLoggedIn = true;
        req.session.username = username
        res.sendStatus(200)
    }
    else{
        console.log('user not logged in')
        res.sendStatus(400)
    }
});
module.exports = user;