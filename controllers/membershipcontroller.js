const express = require('express');
const passCode = process.env.MEMBER_SECRET_CODE;
const { body, validationResult } = require('express-validator');
const userQuery = require('../database/userQueries');

const getMembership = async (req, res) => {
    console.log('user: ', req.user);
    res.render('become-member.ejs', { user: req.user || null, messages: req.flash() });
}
const validatePasscode = [
    body('code')
        .trim()
        .escape(),
]

const postMembership = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { code } = req.body;
        const user = req.user;
        if (!user) {
            console.log("user not authenticated");
            return res.redirect('/membership');
        }
        if (code === passCode) {
            await userQuery.makeMember(req.user.id);
            req.flash('success', "you've become a member now");
            res.redirect('/');
        } else {
            console.log('incorrect passcode');
            req.flash('failure', "Incorrect passcode. try again.");
            res.redirect('/membership');
            // res.status(400);
            // next();
        }

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getMembership,
    validatePasscode,
    postMembership
}