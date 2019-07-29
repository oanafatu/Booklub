const { Pool } = require('pg');

const pool = new Pool({
  user: 'jlano',
  host: 'localhost',
  database: 'booklub',
  password: 'monkey',
  port: 5432
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports.executeQuery = async function(sql, params) {
  const client = await pool.connect();
  let res;
  try {
    res = await client.query(sql, params);
  } finally {
    client.release();
    return res;
  }
};
