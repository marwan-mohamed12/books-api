const dbConnection = require("../db/connection");
var passwordValidator = require("password-validator");
var passwordChecker = new passwordValidator();
const bcrypt = require("bcryptjs");

exports.idValidation = async (id, query) => {
    try {
        let result = await dbConnection.dbQuery(query, [id]);
        if (result.rows.length === 0) {
            return false;
        }
        return true;
    } catch (error) {
        console.log("Error in idValidation", error);
    }
};

exports.comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

exports.isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

exports.isValidatePassword = (password) => {
    if (password.length < 8 || password === "") {
        return false;
    }
    return true;
};

exports.isValidPassword = (password) => {
    passwordChecker
        .is()
        .min(8) // Minimum length 8
        .is()
        .max(15) // Maximum length 100
        .has()
        .uppercase() // Must have uppercase letters
        .has()
        .lowercase() // Must have lowercase letters
        .has()
        .digits(2) // Must have at least 2 digits
        .has()
        .not()
        .spaces() // Should not have spaces
        .is()
        .not()
        .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

    return passwordChecker.validate(password);
};
