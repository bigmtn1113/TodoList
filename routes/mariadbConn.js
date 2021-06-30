const mariadb = require('mariadb');
const vals = require('./consts');

const pool = mariadb.createPool({
    host: vals.DBHost
    , port: vals.DBPort
    , user: vals.DBUser
    , password: vals.DBPass
    , connectionLimit: 5
});

async function addUser(userId, userPw) {
    let conn;

    try {
        conn = await pool.getConnection();
        conn.query('use users');
        await conn.query(`insert into users values('${userId}', '${userPw}')`);
    } catch(err) {
        throw err;
    } finally {
        if(conn) {
            conn.end();
        }
    }
}

module.exports = {addUser : addUser};