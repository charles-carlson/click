const { Pool } = require ('pg');

const pool = new Pool({
  user: 'carlso13',
  host: 'csinparallel.cs.stolaf.edu',
  database: 'mca_s20',
  port: 5432,
});

var scheme = 'carlso13';
var repo = 'click';

pool.on('connect', client =>{
    client.query(`SET search_path = ${repo},${scheme},public`)
});

module.exports = pool;
