const { Pool } = require('pg');
require('dotenv').config();
const DBMS_URL = process.env.DBMS_URL;

module.exports = new Pool({
    connectionString: DBMS_URL
});
