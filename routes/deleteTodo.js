const express = require('express');
const path = require('path');

const mariadbConn = require('./mariadbConn.js');
const router = express.Router();

router.get('/', (req, res) => {
    let todo_id = req.query['todo_id'];

    mariadbConn.deleteTodo(todo_id).then(() => {
        res.end('ok');
    });
});

module.exports = router;