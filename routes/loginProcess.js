const express = require('express');
const path = require('path');

const mariadbConn = require('./mariadbConn.js');
const router = express.Router();

router.post('/', (req, res) => {
    let id = req.body['id'];
    let pw = req.body['pw'];

    mariadbConn.login(id, pw).then((row) => {
        if (row[0] !== undefined) {
            res.sendFile(path.join(__dirname, '../public/html/main_page.html'));
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;