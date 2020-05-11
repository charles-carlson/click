var express = require('express');
var scores = express.Router();
var pool = require('../config/db').getPool()

scores.get('/getScore', async function(req,response){
    var uid= req.session.uid;
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
            response.json({points:0})
        }
        else{
            console.log('user has '+res[0].points+' points')
            response.json({points:res[0].points})
        }
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