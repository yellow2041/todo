const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    const [row] = await req.app.locals.connection.query(
        'SELECT name FROM user WHERE userid = 1'
    );
    res.send(row)
    res.sendFile(path.join(__dirname, "../../view/index.html"));
});
router.post('/',async (req, res,err)=>{
    if(!req.session.userid){
        req.session.userid=1;
        const [row] = await req.app.locals.connection.query(
            'SELECT name FROM user WHERE id = 1'
        );
        req.session.name=row;
    }
    console.log(req.session);
    res.send(req.session);
});


module.exports = router;