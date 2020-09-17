const mysql = require('mysql2/promise');

module.exports=mysql.createPool({
    host: '49.50.172.152',
    user: 'jy',
    password: '0000',
    database: 'mydb'
});