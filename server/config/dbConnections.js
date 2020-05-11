const pool = require('./db.js').getPool();

var schema = 'mca_s20_click';
var repo = 'mca_s20_click';

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
     username VARCHAR(100)  UNIQUE NOT NULL,
     password VARCHAR(125)  
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
    (uid INTEGER NOT NULL REFERENCES users(uid),
     points INTEGER)`;
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
    (uid INTEGER NOT NULL REFERENCES users(uid),
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