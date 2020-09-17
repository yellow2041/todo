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

const move_todo=async(req)=>{
    const connection=await getConn(req);
    const log_time=datetime();
    const value=[req.session.userid, req.body.title, req.body.status, req.body.new_status,'move', log_time];
    await connection.query(
        'INSERT INTO log (user_id, title, origin_status, new_status, action, time) VALUES ?',[[value]]
    );
    connection.release();
    return;
}

const select_todo=async(req)=>{
    const connection=await getConn(req);
    const log_time=datetime();
    const [row] = await connection.query(
        'INSERT INTO log (user_id, title, origin_status, new_status, action, time) VALUES ?',[[value]]
    );
    connection.release();
    return row;
}

const update_todo=async(req)=>{
    const connection=await getConn(req);
    const log_time=datetime();
    const value=[req.session.userid, req.body.title, 'update', log_time];
    await connection.query(
        'INSERT INTO log (user_id, title, action, time) VALUES ?',[[value]]
    );
    connection.release();
    return;
}

const delete_todo=async(req)=>{
    const connection=await getConn(req);
    const log_time=datetime();
    const value=[req.session.userid, req.body.title, req.body.status, 'delete', log_time];
    await connection.query(
        'INSERT INTO log (user_id, title, origin_status action, time) VALUES ?',[[value]]
    );
    connection.release();
    return;
}