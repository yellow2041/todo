const express = require('express')
const app = express();
const port = 3001;
const mysql = require('mysql2/promise');
const session = require('express-session');
const bodyParser = require('body-parser');

const indexRouter = require('./controller/routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.locals.pool = mysql.createPool({
    host: '49.50.172.152',
    user: 'jy',
    password: '0000',
    database: 'mydb'
});

app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;