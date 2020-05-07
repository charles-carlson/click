const app = require('../app');
var pool = require('../config/db').getPool()
var bcrypt = require('bcrypt')


const salt = bcrypt.genSaltSync(10);
var passw = bcrypt.hash('12345',salt,function(err,res){
    if(err){
        console.error(err);
    }
    else{
        var queryConfig = {
            text: 'INSERT INTO users(username,password) VALUES($1,$2);',
            values: ['testUser2',res]
        }
        pool.query(queryConfig,function(err,res){
            if (err) {
                console.error(err);
                return;
            }
            else{
                console.log('insert into table')
            }
        })
    }
});
console.log(passw)
