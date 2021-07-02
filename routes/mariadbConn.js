const mariadb = require('mariadb');
const vals = require('./consts');

const pool = mariadb.createPool({
    host: vals.DBHost
    , port: vals.DBPort
    , user: vals.DBUser
    , password: vals.DBPass
    , connectionLimit: 5
});

async function getUser(userId) {
    let conn, row;

    try {
        conn = await pool.getConnection();
        conn.query('use todolist');
        row = await conn.query(`select * from users where user_id='${userId}'`);
    } catch(err) {
        throw err;
    } finally {
        if(conn) {
            conn.end();
        }

        return row;
    }
}

async function getTodoListOfUser(userId) {
    let conn, rows;

    try {
        conn = await pool.getConnection();
        conn.query('use todolist');
        rows = await conn.query(`select * from todo where user_id='${userId}'`);
    } catch(err) {
        throw err;
    } finally {
        if(conn) {
            conn.end();
        }

        return rows;
    }
}

async function addUser(userId, userPw) {
    let conn;

    try {
        conn = await pool.getConnection();
        conn.query('use todolist');
        await conn.query(`insert into users values('${userId}', '${userPw}')`);
    } catch(err) {
        throw err;
    } finally {
        if(conn) {
            conn.end();
        }
    }
}

async function addTodo(content, due_date, user_id) {
    let conn, row;

    try {
        conn = await pool.getConnection();
        conn.query('use todolist');
        
        if (due_date) {
            await conn.query(`insert into todo(content, due_date, user_id) values('${content}', '${due_date}', '${user_id}')`);
        } else {
            await conn.query(`insert into todo(content, user_id) values('${content}', '${user_id}')`);
        }

        row = conn.query(`select todo_id from todo order by todo_id desc limit 1`);
    } catch(err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }

        return row;
    }
}

async function updateTodo(todo_id, content, due_date, completion_status) {
    let conn;

    try {
        conn = await pool.getConnection();
        conn.query('use todolist');

        if (due_date) {
            await conn.query(`update todo set content='${content}', due_date='${due_date}', completion_status='${completion_status}' where todo_id='${todo_id}'`);
        } else {
            await conn.query(`update todo set content='${content}', completion_status='${completion_status}' where todo_id='${todo_id}'`);
        }
    } catch(err) {
        throw err;
    } finally {
        if(conn) {
            conn.end();
        }
    }
}

async function deleteTodo(todo_id) {
    let conn;

    try {
        conn = await pool.getConnection();
        conn.query('use todolist');
        await conn.query(`delete from todo where todo_id='${todo_id}'`);
    } catch(err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
}

module.exports = {
    getUser: getUser
    , getTodoListOfUser: getTodoListOfUser
    , addUser: addUser
    , addTodo: addTodo
    , updateTodo: updateTodo
    , deleteTodo: deleteTodo
};