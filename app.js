const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const indexRouter = require('./routes');
const loginRouter = require('./routes/login');
const joinRouter = require('./routes/join');
const loginProcessRouter = require('./routes/loginProcess');
const joinProcessRouter = require('./routes/joinProcess');
const userTodoListRouter = require('./routes/userTodoList');
const addTodoRouter = require('./routes/addTodo');
const updateTodoRouter = require('./routes/updateTodo');
const deleteTodoRouter = require('./routes/deleteTodo');
const logoutRouter = require('./routes/logout');

const app = express();
app.set('port', process.env.PORT);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
}));

app.use('/static', express.static(__dirname + '/public'));
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/loginProcess', loginProcessRouter);
app.use('/joinProcess', joinProcessRouter);
app.use('/userTodoList', userTodoListRouter);
app.use('/addTodo', addTodoRouter);
app.use('/updateTodo', updateTodoRouter);
app.use('/deleteTodo', deleteTodoRouter);
app.use('/logout', logoutRouter);

app.set('view engine', 'ejs');
app.set('views', './views_ejs');

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});