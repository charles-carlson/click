var express = require('express');
var scores = express.Router();
var pool = require('../config/db').getPool()

scores.get('/getHighscores',async function(req,response){
    pool.query('SELECT users.username,scores.uid,scores.points FROM scores,users WHERE users.uid=scores.uid ORDER BY points DESC LIMIT 10')
    .then(res=>{
        response.json(res)
    }).catch(err=>{
        console.log(err)
        throw err
    })
})
scores.get('/getScore', async function(req,response){
    var uid= req.session.uid;
    var queryConfig = {
        text: 'SELECT points FROM scores WHERE scores.uid = $1;',
        values: [uid]
    }
    pool.query(queryConfig).then(res=>{
        response.json(res)
    }).catch(err=>{
        console.log(err)
        throw err
    })


})

scores.put('/increase',async function(request,response){
    pool.query(`UPDATE scores SET points = points + 1 WHERE scores.uid = $1`,[request.session.uid]).
    then(res=>{
        console.log('updated score')
        response.sendStatus(200)
    }).catch(err=>{
        console.log(err)
        throw err;
    })
})

module.exports = scores;