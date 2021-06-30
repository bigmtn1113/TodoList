const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const indexRouter = require('./routes');

const app = express();
app.set('port', process.env.PORT);

app.use(morgan('dev'));

app.use('/static', express.static(__dirname + '/public'));
app.use('/', indexRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});