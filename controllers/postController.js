const postQuery = require('../database/postQueries');
const { body, validationResult } = require('express-validator');
// const user = req.user;
const validatePost = [
    body('title')
        .trim()
        .escape(),
    body('desc')
        .trim()
        .escape()
]

const newPost = async (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
    }

    try {
        const title = req.body.title;
        const desc = req.body.desc;
        const date = new Date();
        const uid = req.user.id;
        await postQuery.newPost(title, desc, date, uid);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        next(err);
    }
}
const getPosts = async (req, res, next) => {
    try {
        const posts = await postQuery.getPosts();
        // const op = await postQuery.getOp();
        // console.log('op, ', op);
        res.render('index', { user: req.user || null, posts: posts });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    validatePost,
    newPost,
    getPosts
}