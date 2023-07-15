const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.generateToken = (
    userId,
    username,
    email,
    fullname,
    userRoles,
    userTypeCode
) => {
    return jwt.sign(
        {
            userId,
            username,
            email,
            fullname,
            roles: userRoles,
            userType: userTypeCode,
        },
        process.env.SECRET,
        { expiresIn: "3d" }
    );
};

exports.verifyToken = (userRoles) => {
    return async (req, res, next) => {
        try {
            const { token } = req.headers;
            if (!token) {
                console.log("No token provided");
                return res.status(500).send({ error: "Token is not provided" });
            }
            const { userId, username, email, fullname, roles, userType } =
                jwt.verify(token, process.env.SECRET);

            req.user = {
                userId,
                username,
                email,
                fullname,
                roles,
                userType,
            };

            if (!this.hasRole(userRoles, roles)) {
                console.log("Error : not have the same role");
                return res.status(401).send({ error: "Authentication failed" });
            }

            console.log("Valid Token");

            next();
        } catch (error) {
            next(error);
        }
    };
};

exports.hasRole = function (routeRoles, userRoles) {
    console.log("routeRoles : " + routeRoles);
    let result = false;
    userRoles.forEach((role) => {
        if (routeRoles.includes(role)) {
            result = true;
            return;
        }
    });
    console.log("result : " + result);
    return result;
};
