const express = require('express');
const path = require('path');

const mariadbConn = require('./mariadbConn.js');
const router = express.Router();

router.get('/', (req, res) => {
    let todo_id = req.query['todo_id'];
    let content = req.query['content'];
    let due_date = req.query['due_date'];
    let completion_status = req.query['completion_status'];

    mariadbConn.updateTodo(todo_id, content, due_date, completion_status).then(() => {
        res.end('ok');
    });
});

module.exports = router;