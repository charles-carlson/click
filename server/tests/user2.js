const app = require('../app');
var pool = require('../config/db').getPool()
var bcrypt = require('bcrypt')

var schema = 'carlso13';
var repo = 'mca_s20_click';

pool.on('connect', client =>{
    client.query(`SET search_path = ${repo},${schema},public;`)
    console.log('connection established')
});
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

const salt = bcrypt.genSaltSync(10);
var passw = bcrypt.hash('1234',salt,function(err,res){
    if(err){
        console.error(err);
    }
    else{
        var queryConfig = {
            text: 'INSERT INTO users(username,password) VALUES($1,$2);',
            values: ['testUser',res]
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
