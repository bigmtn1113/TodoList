const express = require('express');
const path = require('path');

const mariadbConn = require('./mariadbConn.js');
const router = express.Router();

router.post('/', (req, res) => {
    let id = req.body['id'];
    let pw = req.body['pw'];

    mariadbConn.login(id, pw).then((row) => {
        if (row[0] !== undefined) {
            if (row[0].user_pw === pw) {
                req.session.loginUser = row[0];

                res.render('main_page', {loginUser: req.session.loginUser});
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;