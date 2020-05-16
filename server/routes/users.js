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


user.post('/join', async function (req,response){//creates user if not existing
    var queryConfig = {
        text: 'INSERT INTO users(username,password,salt) VALUES($1,$2,$3);',
        values: [req.body.username,req.body.password,req.body.salt]
    }
    pool.query(queryConfig, async function(err,result){
            if (err) {
                console.log(err)
                response.json([{message:'username already exists'}]);
                throw err;
            }
            else{
                console.log('USER CREATED')
                var {rows} = await pool.query('SELECT uid FROM users WHERE username = $1;',[req.body.username])
                console.log(rows[0].uid)
                pool.query('INSERT INTO scores(uid,points) VALUES($1,$2);',[rows[0].uid,0],async function(err,res){
                    if(err){
                        console.log(err)
                        throw err;
                    }
                    pool.query('INSERT INTO money(uid,coins) VALUES($1,$2);',[rows[0].uid,0],function(err,res){
                        if(err){
                            console.log(err)
                            throw err;
                        }
                        else{
                            response.json([{message:'CREATED'}])
                        }
                    })
                })           
                
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
        text:'SELECT uid,username,password,salt FROM users WHERE username=$1;',
        values: [username]
    }
    try{
        var {rows} = await pool.query(qConfig)
        var attempt = await bcrypt.hash(password,rows[0].salt)
        console.log('success')
        console.log(rows[0].username)
        console.log(rows[0].uid)
        if(rows[0].password == attempt){
            console.log('user logged in')
            req.session.isLoggedIn = true;
            req.session.username = username;
            req.session.uid = rows[0].uid;
            req.session.save();
            res.status(200).json({message:'Login',
                                  uid: rows[0].uid,
                                  session:req.session});
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
user.delete('/destroy', async function(req,response){
    var uid = req.session.uid;
    pool.query('DELETE FROM users,money,scores,session WHERE users.uid = $1 money.uid = $1 scores.uid = $1 session.uid = $1',[uid])
    .then(res=>{
        console.log('user deleted')
        response.sendStatus(200)
    })
    .catch(err=>{
        console.log(err)
        throw err
    })
})
user.get('/logout',async function(req,res,next){
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                console.log(err)
                throw err;
            }
            else{
                console.log('user logged out')
                res.status(200)
            }
        })
    }
});
module.exports = user;