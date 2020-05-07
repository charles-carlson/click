var pool = require('./db').getPool();
var passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');


module.exports= new LocalStrategy({passReqToCallback:true},
    (req,username,password,done)=>{
            try{
                var qconfig = {
                    text:'SELECT username,password FROM users WHERE username=$1;',
                    values: username
                }
                pool.query(qconfig, function(err,result){
                    if(err){
                        console.error(err)
                    }
                    if(!result){
                        return done(null,false)
                    }
                    
                    bcrypt.compare(password,result.rows[0][password],function(err,check){
                        if(err){
                            return done(null,false,{message:'password is incorrect'})
                        }
                        else if(check){
                            return done(null,{username: result.rows[0][username]})
                        }
                        else{
                            return done(null,false);
                        }
                    });
                    
                });

            }catch(e){
                throw e;
            }
    })

/*
    function(err,result){
        console.log('DB response: ' + result.rows[0]);
        if(err){
            throw(err)
        }
        if(result.rows[0][username] = null){
            return done(null,false,{message:'username does not exist'})
        }
        else{
            bcrypt.compare(password,result.rows[0].password,function(err,check){
                if(err){
                    return done(null,false,{message:'password is incorrect'})
                }
                else if(check){
                    return done(null,{username: result.rows[0][username]})
                }
                else{
                    return done(null,false);
                }
            });
        }
    }*/