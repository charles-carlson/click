var express = require('express');
var scores = express.Router();
var pool = require('../config/db').getPool()

scores.get('/getScore', async function(req,response){
    var uid= req.body.uid;
    console.log(uid);
    var queryConfig = {
        text: 'SELECT points FROM scores WHERE scores.uid = $1;',
        values: [uid]
    }
    pool.query(queryConfig,function(err,res){
        if(err){
            console.log(err)
            throw err;
        }
        else if(!res[0].points){
            console.log('user has 0 points')
            response.json({points:1})
        }
        else{
            console.log('user has '+res[0].points+' points')
            response.json({points:res[0].points})
        }
    })

})
scores.post('/initialize',async function(request,response){
    var uid = parseInt(request.body.uid);
    console.log(uid);
    pool.query(`INSERT INTO scores VALUES($1,$2)`,[uid,1]).
    then(res=>{
        console.log('initialize score')
        response.sendStatus(200)
    }).catch(err=>{
        console.log(err)
        throw err;
    })
})
scores.put('/increase',async function(request,response){
    var uid = parseInt(request.body.uid);
    console.log(uid);
    pool.query(`UPDATE scores SET points = points + 1 WHERE scores.uid = $1`,[uid]).
    then(res=>{
        console.log('updated score')
        response.sendStatus(200)
    }).catch(err=>{
        console.log(err)
        throw err;
    })
})

module.exports = scores;