const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const indexRouter = require('./routes/index');
const lineRouter = require('./routes/line');

const app = express();
app.use(cors()); // allow all origin

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'mms-frontend-react')));

app.use('/line', lineRouter); // http://localhost:4000/line

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);  // http://localhost:4000/

//frontend http://localhost:4000/mms-frontend-react
app.get('/mms-frontend-react/*',function(req,res,next){
    res.sendFile(path.join(__dirname,'mms-frontend-react','index.html'));
});

module.exports = app;
