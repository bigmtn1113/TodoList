const express = require('express');
const path = require('path');

const mariadbConn = require('./mariadbConn.js');
const router = express.Router();

router.get('/', (req, res) => {
    let content = req.query['content'];
    let due_date = req.query['due_date'];
    let user_id = req.session.loginUserId;

    mariadbConn.addTodo(content, due_date, user_id).then((row) => {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(row));
    });
});

module.exports = router;