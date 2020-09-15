const express = require('express');
const router = express.Router();
const path = require('path');

const datetime=()=>{
    const date=new Date();
    return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+ " " +date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}

router.get('/', async (req, res, next) => {
    // const connection = await req.app.locals.pool.getConnection(async conn => conn);
    // const [row] = await connection.query(
    //     'SELECT title, contents FROM todo_list'
    // );
    // res.json(row);
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});
router.get('/main',async (req, res, next) => {
    const connection = await req.app.locals.pool.getConnection(async conn => conn);
    const [row] = await connection.query(
        'SELECT title, contents FROM todo_list'
    );
    res.json(row);
});

router.post('/login', async (req, res, err) => {
    if (!req.session.userid) {
        req.session.userid = 1;
        const connection = await req.app.locals.pool.getConnection(async conn => conn);
        const [row] = await connection.query(
            'SELECT name FROM user WHERE userid = 1'
        );
        req.session.name = row;
        req.session.save();
    }
    console.log(req.session);
});
router.post('/add_list', async (req, res) => {
    const creation_time=datetime();
    console.log(creation_time);
    const value = [req.body.title, req.body.contents, req.session.userid, "todo", creation_time,creation_time];
    const connection = await req.app.locals.pool.getConnection(async conn => conn);
    await connection.query(
        'INSERT INTO todo_list (title, contents, writer_id, status, creation_time, status_time) VALUES ?', [[value]]
    );
    res.redirect('/');
})


module.exports = router;