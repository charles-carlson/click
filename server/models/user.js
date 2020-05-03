var db = require('../config/db.js');
var pool = db.getPool();

class User{
    constructor(user_name){
        this.user_name = user_name;
    }
};