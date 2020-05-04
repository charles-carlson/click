var pool = require('./db').getPool();
var passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.use('local', new LocalStrategy({passReqToCallback:true},
    (req,user_name,password,done)=>{
        loginAttempt()
        async function loginAttempt(){
            const client = pool.connect();
            try{
                await client.query('BEGIN')
                var currentUser = JSON.stringify(client.query(`SELECT uid user_name password FROM users WHERE user_name=$1`,[user_name],
                function(err,result){
                    if(err){
                        return done(err)
                    }
                    if(result.rows[0] = null){
                        return(done,false)
                    }
                    else{
                        bcrypt.compare(password,result.rows[0].password,function(err,check){
                            if(err){
                                return done()
                            }
                            else if(check){
                                return done(null,[{user_name: result.rows[0].user_name}])
                            }
                            else{
                                return done(null,false);
                            }
                        });
                    }
                }))
            }catch(e){
                throw e;
            }
        }
    }))
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });