require('dotenv').config();
let express = require('express');
const userroutes = require('../backend/routes/userroutes');
const jobroutes = require('../backend/routes/jobroutes');
const homeroutes = require('../backend/routes/homeroutes');
const applicationroutes = require('../backend/routes/applicationroutes');
const cors = require("cors");
const passport = require("passport");
const usersdb = require('./db/usersdb');
const path = require("path");
const cookieparser = require('cookie-parser');

let app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieparser());

app.use("/resumes", express.static(path.resolve(process.cwd(),  "..","resumes")));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// app.use(passport.initialize());

// app.use(passport.session());

// passport.use(usersdb.createStrategy());
// passport.serializeUser(usersdb.serializeUser());
// passport.deserializeUser(usersdb.deserializeUser());

app.use('/user', userroutes);

app.use('/job', jobroutes);

app.use('', homeroutes);

app.use('/application', applicationroutes);

app.listen(3000);