const queries = require("../db/queires"),
    dbConnection = require("../db/connection");
const Logger = require("../services/loggerService");
const logger = new Logger("loginController");
const errorStatus = require("../error/errorStatus");
const validationUtil = require("../util//validation");
const jwtUtil = require("../util/jwtUtil");

exports.getUserProfile = async (req, res) => {
    try {
        return res.status(200).send(req.user);
    } catch (error) {
        console.log("Error in getUserProfile", error);
        return res.status(500).send("Failed to get user profile");
    }
};

exports.signIn = async (req, res) => {
    try {
        const { username, secretword } = req.body;
        const password = secretword;

        /**
         * 1- Validate is not empty
         * 2- Get user by username
         * 3- Compare password
         * 4- Generate token
         * 5- Get user roles
         */

        if (!username || !password) {
            return res.status(500).send({
                error: "username and password can not be empty.",
            });
        }

        let loginQuery = queries.queryList.LOGIN_QUERY;
        let result = await dbConnection.dbQuery(loginQuery, [username]);

        const dbResponse = result.rows[0];

        if (dbResponse == null) {
            logger.info(`username ${username} doesn't exist in db`);
            return res.status(errorStatus.UNAUTHORIZED).send({
                error: "username doesn't exist.",
            });
        }

        const isValidPassword = validationUtil.comparePassword(
            password,
            dbResponse.secretword
        );

        if (!isValidPassword) {
            logger.info(`Invalid Password`);
            return res.status(errorStatus.UNAUTHORIZED).send({
                error: "Invalid username or password",
            });
        }

        let userRoles = await this.getUserRoles(dbResponse.user_id);

        const { user_id, email, full_name, user_type_code } = dbResponse;
        const token = jwtUtil.generateToken(
            user_id,
            username,
            email,
            full_name,
            userRoles,
            user_type_code
        );

        return res.status(200).send(token);
    } catch (error) {
        console.log(error);
        logger.error(`Failed to singIn, Invalid username or password`);
        return res.status(500).send({
            error: "Failed to singIn, Invalid username or password  ",
        });
    }
};

exports.getUserRoles = async (userId) => {
    try {
        let roles = ["user", "admin"];
        return roles;
    } catch (error) {}
};
