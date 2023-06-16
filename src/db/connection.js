const pool = require("./pool");

exports.dbQuery = async (queryText, queryParamss) => {
    return await pool.query(queryText, queryParamss);
};
