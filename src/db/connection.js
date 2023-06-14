const pool = require("./pool");

// exports.dbQuery = async (queryText, queryParamss) => {
//     return await pool.query(queryText, queryParamss);
// };

exports.dbQuery = (queryText, queryParamss) => {
    return new Promise((resolve, reject) => {
        pool.query(queryText, queryParamss)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => reject(err));
    });
};
