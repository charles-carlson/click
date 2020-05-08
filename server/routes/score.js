var express = require('express');
var scores = express.Router();
var pool = require('../config/db').getPool()

scores.get('/score', async function(req,res){
    var user = req.session.username;
    var scid = req.session.scid;
    pool.query(`SELECT points FROM users,score WHERE users.username = $1 AND score.scid = $2`,[user,scid]).
    then(res =>{
        console.log('returns users points')
        res.send({score:points})
    }).
    catch(err=>{
        throw err;
    })
})

scores.put('/score',async function(req,res){
    var user = req.session.username;
    var scid = req.session.scid;
    pool.query(`UPDATE score SET points = points + 1 FROM users WHERE users.username = $1 AND score.scid = $2`,[user,scid]).
    then(res=>{
        res.sendStatus(200)
    }).catch(err=>{
        throw err;
    })
})

module.exports = scores;