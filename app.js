const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routes/userRoute');
const indexRouter = require('./routes/indexRouter');
const membershipRouter = require('./routes/membershipRouter');
const session = require('express-session');
const passport = require('passport');
const postRouter = require('./routes/postRoute');
const flash = require('express-flash')



app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/membership', membershipRouter);


app.listen(3000, () => {
    console.log("Listening to port 3000");
})