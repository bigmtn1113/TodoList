const express = require('express');
const path = require('path');

const mariadbConn = require('./mariadbConn.js');
const router = express.Router();

router.post('/', (req, res) => {
    let id = req.body['id'];
    let pw = req.body['pw'];

    mariadbConn.addUser(id, pw).then(() => {
        res.sendFile(path.join(__dirname, '../public/html/login_page.html'));
    });
});

module.exports = router;