const express = require('express');
const router = express.Router();
const postcontroller = require('../controllers/postController');

router.get('/create-post', (req, res) => {
    res.render('create-post.ejs', { user: req.user });
})
router.post('/create-post', postcontroller.validatePost, postcontroller.newPost);

module.exports = router;