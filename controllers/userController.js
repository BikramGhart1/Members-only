const userQuery = require('../database/userQueries');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const pool = require('../database/pool')

const validateSignUp = [
    body('fname')
        .trim()
        .isLength({ min: 1 }).withMessage('first name should be atleast 1 char')
        .isAlpha().withMessage("First name should only contain alphabets"),
    body('lname')
        .trim()
        .isLength({ min: 1 }).withMessage('last name should be atleast 1 char')
        .isAlpha().withMessage("last name should only contain alphabets"),
    body('username')
        .trim()
        .isLength({ min: 3, max: 20 }).withMessage("Username should be between 3 and 20 characters")
        .escape(),

]

const signUpUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await userQuery.addUser(req.body.fname, req.body.lname, req.body.username, hashedPassword);
        res.redirect('/');
    } catch (err) {
        return next()
    }
}
const validateLogin = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 20 }).withMessage("Username should be between 3 and 20 characters")
        .escape(),
]
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await userQuery.logInquery(username, password);
            if (!user) {
                return done(null, false, { message: "user not found!" });
            }
            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);

        } catch (err) {
            throw err;
        }
    })
)
passport.serializeUser((user, done) => {
    return done(null, user.id);
})
//
passport.deserializeUser(async (id, done) => {
    try {

        //fetch data again and send to authenticate function
        const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id])
        console.log(" rows: ", rows);
        const user = rows[0];
        // console.log(user);

        //with this req.user will have data of user as we are passing this as an object
        done(null, user);
    } catch (err) {
        console.log(err);
        done(err);
    }
})
//should i do it directly in routes or is there another way for authentication and export
const loginUser = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/log-in"
})

const logOutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

module.exports = {
    validateSignUp,
    signUpUser,
    validateLogin,
    loginUser,
    logOutUser,

}