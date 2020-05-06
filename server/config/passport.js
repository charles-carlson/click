var pool = require('./db').getPool();
var passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
// MAY NOT NEED TO USE
passport.use('local', new LocalStrategy({passReqToCallback:true},
    (req,username,password,done)=>{
        loginAttempt()
        function loginAttempt(){
            pool.on('connect', client =>{
                client.query(`SET search_path = ${repo},${schema},public`)
            });
            pool.on('error', (err, client) => {
                console.error('Unexpected error on idle client', err)
                process.exit(-1)
              })
            try{
                JSON.stringify(pool.query(`SELECT uid user_name password FROM users WHERE user_name=$1`,[username],
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
                                return done(null,[{username: result.rows[0].username}])
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

    module.exports = passport;
