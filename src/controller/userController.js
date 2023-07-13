const queries = require("../db/queires"),
    dbConnection = require("../db/connection");
const Logger = require("../services/loggerService");
const logger = new Logger("userController");
const auditService = require("../audit/auditServices");
const action = require("../audit/auditAction");
const { dateformat } = require("../util/helpers");
const validationUtil = require("../util/validation");
const bcrypt = require("bcryptjs");

exports.getUserList = async (req, res) => {
    try {
        let userListQuery = queries.queryList.GET_USER_LIST_QUERY;
        let result = await dbConnection.dbQuery(userListQuery);
        logger.info("User list fetched successfully", result.rows);
        auditService.prepareAudit(
            action.actionList.GET_USER_LIST,
            result.rows,
            null,
            "admin",
            new Date(Date.now())
        );

        return res.status(200).send(result.rows);
    } catch (error) {
        console.log("Error in getUserList", error);
        let errorMessage = `Failed to get users: ${error}`;
        auditService.prepareAudit(
            action.actionList.GET_USER_LIST,
            null,
            errorMessage,
            "admin",
            dateformat()
        );
        return res.status(500).send("Failed to get books");
    }
};

exports.createUser = async (req, res) => {
    try {
        let createdOn = new Date(),
            createdBy = "admin";

        let { username, password, email, userTypeCode, fullname, groups } =
            req.body;

        if (!username || !password || !email || !groups) {
            return res.status(500).send({
                error: "please provide username, password, email and groups",
            });
        }

        // Validation
        // username or email dosen't exsit!
        // is email?
        // validate password strength

        let isUserExistsQuery = queries.queryList.IS_USER_EXISTS_QUERY;
        let result = await dbConnection.dbQuery(isUserExistsQuery, [
            username,
            email,
        ]);

        if (result.rows[0].count !== "0") {
            return res.status(500).send({
                error: "User already exsits.",
            });
        }

        if (!validationUtil.isValidEmail(email)) {
            return res.status(500).send({
                error: "please provide valid email.",
            });
        }

        if (!validationUtil.isValidPassword(password)) {
            return res.status(500).send({
                error: "Password is not valid",
            });
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        let addUserQuery = queries.queryList.ADD_USER_QUERY;
        const values = [
            username,
            hashedPassword,
            email,
            userTypeCode,
            fullname,
            createdOn,
            createdBy,
        ];
        console.log(values);
        await dbConnection.dbQuery(addUserQuery, values);

        return res.status(200).send("User added successfully");
    } catch (error) {
        console.log("Error in createUser", error);
        logger.error("Error in createUser", error);
        return res.status(500).send("Failed to add user");
    }
};
