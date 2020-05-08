const { Pool } = require ('pg');

var pool;
const config = {
  user: 'carlso13',
  host: 'csinparallel.cs.stolaf.edu',
  database: 'mca_s20',
  port: 5432,
};

module.exports ={
    getPool: function(){
        if(pool)return pool;
        pool = new Pool(config);
        return pool;
    }
};
