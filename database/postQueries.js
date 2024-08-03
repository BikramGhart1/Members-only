const pool = require('./pool');

const newPost = async (title, desc, date, uid) => {
    try {
        await pool.query('INSERT INTO posts (title,description,date,uid) VALUES ($1,$2,$3,$4)', [title, desc, date, uid]);

    } catch (err) {
        throw err;
    }
}
const getPosts = async (req, res, next) => {
    try {
        // const { rows } = await pool.query('SELECT * FROM posts');
        const { rows } = await pool.query(
            'SELECT users.username,users.id,posts.id,posts.title,posts.description,posts.date,posts.uid FROM posts JOIN users ON posts.uid=users.id ORDER BY posts.date DESC LIMIT 10'
        )
        return rows;
    } catch (err) {
        console.log(err);
        next(err)
    }
}
// const getOp = async () => {
//     try {
//         const { rows } = await pool.query(
//             'SELECT id,username FROM users JOIN posts ON users.id=posts.uid'
//         );
//         return rows;
//     } catch (err) {
//         throw err;
//     }
// }
module.exports = {
    newPost,
    getPosts,

}

