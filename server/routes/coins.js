var express = require('express');
var money= express.Router();
var pool = require('../config/db').getPool()

money.get('/getMoney',async function(request,response){
    var uid = request.session.uid;
    console.log(uid);
    pool.query(`SELECT coins FROM money WHERE uid = $1`,[uid])
    .then(res=>{
        response.json(res)
    })
    .catch(err=>{
        console.log(err)
        throw err;
    })
})

money.put('/deposit',async function(request,response){
    var uid = request.session.uid;
    console.log(uid);
    pool.query('UPDATE money SET coins = coins + 1 WHERE uid = $1',[uid])
    .then(res=>{
        console.log('added a coin')
        response.sendStatus(200)
    })
    .catch(err=>{
        console.log(err)
        throw err;
    })
})
money.put('/withdrawn', async function(request,response){
    var uid = request.session.uid;
    var amt = request.body.withdrawn;
    console.log(uid);
    pool.query(`UPDATE money SET coins = coins - $1 WHERE mid = $2`,[amt,uid])
    .then(res=>{
        console.log('WITHDRAWN COINS')
        response.sendStatus(200)
        })
    .catch(err=>{
            throw err;
        })
})
module.exports = money