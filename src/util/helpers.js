let randomString = require("randomstring");

exports.generateStoreCode = () => {
    return randomString.generate({
        length: 10,
        charset: "alphabetic",
        capitalization: "uppercase",
    });
};

exports.dateformat = () => {
    return new Date(Date.now()).toLocaleString();
};
