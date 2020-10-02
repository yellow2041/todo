const express = require('express');
const router = express.Router();
const path = require('path');
const todo_list=require('../../model/todo_list.js');

const datetime=()=>{
    const date=new Date();
    return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+ " " +date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}

router.get('/', async (req, res, next) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});
router.post('/main',async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    const data=[await todo_list.select_todo_list(req,req.body.status)];
    const count=[await todo_list.todo_count(req,'todo'),await todo_list.todo_count(req,'doing'), await todo_list.todo_count(req,'done')];
    res.json([data,count]);
    res.end();
});

router.post('/login', (req, res, err) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    if (!req.session.userid) {
        req.session.userid = 1;
        req.session.name = 'jiyeon';
        req.session.save();
        res.cookie('id',req.session.name);
        res.send(req.session.name);
        res.end();
    }
    else
        res.redirect('http://localhost:8080/');
});

router.post('/todo-list', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    
    await todo_list.insert_todo(req);
    res.json({status:"ok"});
});

router.put('/todo-status', async(req, res)=>{
    await todo_list.update_todo_status(req,req.body.todo_id,req.body.status);
    res.end();
});

router.put('/todo-contents', async(req,res)=>{
    await todo_list.update_todo_contents(req, req.body.todo_id,req.body.contents);
    res.end();
});

router.delete('/todo/:todo_id', async(req, res)=>{
    await todo_list.delete_todo(req, req.todo_id);
    res.json({status: 'ok'});
});

module.exports = router;