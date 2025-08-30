import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "Vansh@1505",
  host: "localhost",
  port: 5432,
  database: "emr_dashboard"
});

export default pool;
