var express = require('express');
var router = express.Router();
var pool = require('../config/db').getPool()

router.use(passport.initialize());
router.use(passport.session());
var session = require("express-session"); 
var passport = require('passport')

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/join', async function(req,res){//gets page for creating user
    res.sendStatus(200);
})


router.post('/join', async function (req,res){//creates user if not existing
    try{
        const client = await pool.connect()
        await client.query('BEGIN')
        var passw = await bcrypt.hash(req.body.password,5);
        await JSON.stringify(client.query(`SELECT uid FROM users WHERE user_name=$1`,[req.body.user_name],function(err,result){
            if(result.rows[0]){
                res.redirect('/join')
            }
            else{
                client.query(`INSERT INTO users VALUES ($1,$2)`,[req.body.user_name,passw],
                function (err,result){
                    if(err){
                        console.error(err);
                    }
                    else{
                        console.log(result)
                        res.redirect('/login')
                    }
                })
            }
        }));
    client.release();
    }catch(e){
        throw e;
    }
});

router.get('/login',async function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    else{
        res.redirect('/login')
    }
})

router.post('/login', passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect: '/login'
    }),
    function(req,res){
        if(req.body.remember){
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        }
        else{
            req.session.cookie.expires();
        }
    res.redirect('/');
});