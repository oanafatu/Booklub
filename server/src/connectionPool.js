const { Pool } = require('pg');

const connectionSettings = process.env.NODE_ENV === 'production' ?
  {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
  :
  {
    user: 'jlano',
    host: 'localhost',
    database: 'booklub',
    password: 'monkey',
    port: 5432
  };
  
const pool = new Pool(connectionSettings);

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
