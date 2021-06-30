const express = require('express');
const path = require('path');

const mariadbConn = require('./mariadbConn.js');
const router = express.Router();

router.post('/', (req, res) => {
    let id = req.body['id'];
    let pw = req.body['pw'];

    mariadbConn.login(id, pw).then((row) => {
        if (row[0] !== undefined) {
            req.session.loginUserId = row[0].user_id;

            res.render('main_page', {loginUserId: req.session.loginUserId});
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;