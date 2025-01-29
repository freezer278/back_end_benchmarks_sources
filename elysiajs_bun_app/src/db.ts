import {Pool} from 'pg';

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'test_db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Error connecting to PostgreSQL:', err));

export {
    pool,
};
