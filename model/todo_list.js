const getConn = async (req) => { return await req.app.locals.pool.getConnection(async conn => conn); }

const datetime = () => {
    const date = new Date();
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

const select_todo_list = async (req, status) => {
    const connection = await getConn(req);
    const [row] = await connection.query(
        "SELECT todo_id, title, contents, writer_id FROM todo_list where status=?", [status]
    );
    connection.release();
    return row;
}

const insert_todo = async (req) => {
    const connection = await getConn(req);
    const creation_time = datetime();
    const value = [req.body.title, req.body.contents, req.session.userid, "todo", creation_time, creation_time];
    await connection.query(
        'INSERT INTO todo_list (title, contents, writer_id, status, creation_time, status_time) VALUES ?', [[value]]
    );
    connection.release();
    return;
}

const update_todo_status = async (req, todo_id, status) => {
    const connection = await getConn(req);
    const status_time = datetime();
    await connection.query(
        'UPDATE todo_list SET status=?, status_time=? WHERE todo_id=?', [todo_id, status_time, status]
    );
    connection.release();
    return;
}

const update_todo_contents = async (req, todo_id, contents) => {
    const connection = await getConn(req);
    const modify_time = datetime();
    await connection.query(
        'UPDATE todo_list SET contents=?, modify_time=? WHERE todo_id=?', [contents, modify_time, todo_id]
    );
    connection.release();
    return;
}

const delete_todo = async (req, todo_id) => {
    const connection = await getConn(req);
    await connection.query(
        'DELETE FROM todo_list WHERE todo_id=?', [todo_id]
    )
    connection.release();
    return;
}

const todo_count = async (req, status) => {
    const connection = await getConn(req);
    const [row] = await connection.query(
        'SELECT count(*) FROM todo_list WHERE status=?', [status]
    );
    connection.release();
    return row;
}

module.exports = {
    select_todo_list,
    insert_todo,
    update_todo_status,
    update_todo_contents,
    delete_todo,
    todo_count
}