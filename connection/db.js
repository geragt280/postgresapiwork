const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile.development);

module.exports = db;

// const Pool = require('pg').Pool;


// const pool = new Pool({
//     user: 'postgres',
//     password: '123456',
//     host: 'localhost',
//     port: 5432,
//     database:'librarydb'
// });

// module.exports = pool;