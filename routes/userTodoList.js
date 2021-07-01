const express = require('express');
const path = require('path');

const mariadbConn = require('./mariadbConn.js');
const router = express.Router();

router.get('/', (req, res) => {
    id = req.session.loginUserId;

    mariadbConn.getTodoListOfUser(id).then((rows) => {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(rows));
    });
});

module.exports = router;