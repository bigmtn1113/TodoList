const express = require('express');
const path = require('path');

const mariadbConn = require('./mariadbConn.js');
const router = express.Router();

router.get('/', (req, res) => {
    id = req.session.loginUserId;

    mariadbConn.getTodoListOfUser(id).then((rows) => {
        console.log(rows[1]);
    });
});

module.exports = router;