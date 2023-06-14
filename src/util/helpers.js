let randomString = require("randomstring");

exports.generateStoreCode = () => {
    return randomString.generate({
        length: 10,
        charset: "alphabetic",
        capitalization: "uppercase",
    });
};
