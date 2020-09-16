const getConn = async (req) => { return await req.app.locals.pool.getConnection(async conn => conn); }

const datetime = () => {
    const date = new Date();
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

const add_todo=async(req)=>{
    const connection=await getConn(req);
    const log_time=datetime();
    const value=[req.session.userid,req.body.title,req.body.status,'add',log_time];
    await connection.query(
        'INSERT INTO log (user_id, title, new_status, action, time) VALUES ?',[[value]]
    );
    connection.release();
    return;
}