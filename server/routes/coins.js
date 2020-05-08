var express = require('express');
var money= express.Router();
var pool = require('../config/db').getPool()

money.get('/money',async function(req,res){
    var mid = req.session.mid;
    pool.query(`SELECT coins FROM money WHERE mid = $1`,[mid]). 
    then(res=>{
        res.send({wallet:coins})
    })
})
money.put('/money', async function(req,res){
    var mid = req.session.mid;
    var amt = req.session.withdrawn
    pool.query(`UPDATE money SET coins = coins - $1 WHERE mid = $2`,[amt,mid]). 
    then(res=>{
        res.sendStatus(200)
        }).catch(err=>{
            throw err;
        })
})