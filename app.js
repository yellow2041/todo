const express = require('express')
const app = express();
const port = 3001;
const mysql = require('mysql2/promise');
const session = require('express-session');

const indexRouter = require('./controller/routes/index');

app.locals.connection = mysql.createConnection({
    host: '49.50.172.152',
    user: 'jy',
    password: '0000',
    database: 'mydb'
  });

//app.locals.connection.connect();

app.use(session({
    secret: 'keyboard cat', 
    resave: false,
    saveUninitialized: true,
  }));

app.use('/',indexRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;