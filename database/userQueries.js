const pool = require('./pool');
const bcrypt = require('bcryptjs');

async function addUser(fname, lname, username, password) {
    try {
        const query = 'INSERT INTO users (fname,lname,username,password) VALUES ($1,$2,$3,$4)';
        const values = [fname, lname, username, password];
        await pool.query(query, values);
    } catch (err) {
        console.error('Error while inserting: ', err);
        throw err;
    }

}
async function logInquery(username, password) {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
        const user = await rows[0];
        return user;
    } catch (err) {
        throw err;
    }
}
const makeMember = async (id) => {
    await pool.query('UPDATE users SET membership=true WHERE id=$1', [id]);
}
module.exports = {
    addUser,
    logInquery,
    makeMember
}