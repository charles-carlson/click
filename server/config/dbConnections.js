const pool = require('./db.js').getPool();

var schema = 'carlso13';
var repo = 'click';

pool.on('connect', client =>{
    client.query(`SET search_path = ${repo},${schema},public`)
});
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

const create_user_table = () =>{
    const userQuery = `CREATE TABLE IF NOT EXISTS users
    (uid SERIAL PRIMARY KEY,
     scid SERIAL REFERENCES score(scid),
     mid SERIAL REFERENCES money(mid),
     username VARCHAR(100)  UNIQUE NOT NULL,
     password VARCHAR(100) NOT NULL  
     )`;
     pool.query(userQuery).
     then((res)=>{
         console.log(res);
         pool.end();
     }). 
     catch(err=>{
         console.error(err);
         pool.end();
     });
}

const create_score_table = () =>{
    const scoreQuery = `CREATE TABLE IF NOT EXISTS score
    (scid SERIAL PRIMARY KEY,
     score INTEGER)`;
     pool.query(scoreQuery). 
     then((res)=>{
        console.log(res);
        pool.end();
    }). 
    catch(err=>{
        console.error(err);
        pool.end();
    });
}
const create_money_table = () =>{
    const moneyQuery = `CREATE TABLE IF NOT EXISTS money
    (mid SERIAL PRIMARY KEY,
     coins INTEGER)`;
     pool.query(moneyQuery). 
     then((res)=>{
        console.log(res);
        pool.end();
    }). 
    catch(err=>{
        console.error(err);
        pool.end();
    });
}

const createAllTables = () =>{
    create_user_table();
    create_score_table();
    create_money_table();
}

module.exports = createAllTables;
  
require('make-runnable');