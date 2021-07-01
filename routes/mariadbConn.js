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

module.exports = {getUser: getUser, addUser: addUser};