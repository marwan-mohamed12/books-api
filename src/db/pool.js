const { Pool } = require("pg");
const dotenv = require("dotenv").config();

const db_config = {
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 300,
    idleTimeoutMillis: 200,
    max: 20,
    allowExitOnIdle: true,
};

const pool = new Pool(db_config);

pool.on("connect", (client) => {
    console.log(`Database connected`);
});

pool.on("remove", (client) => {
    console.log(`Database connection closed`);
});

module.exports = pool;
