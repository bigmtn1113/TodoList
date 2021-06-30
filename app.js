const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const indexRouter = require('./routes');
const loginRouter = require('./routes/login');
const joinRouter = require('./routes/join');
const loginProcessRouter = require('./routes/loginProcess');
const joinProcessRouter = require('./routes/joinProcess');

const app = express();
app.set('port', process.env.PORT);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/static', express.static(__dirname + '/public'));
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/loginProcess', loginProcessRouter);
app.use('/joinProcess', joinProcessRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});