const winston = require("winston");
const dotenv = require("dotenv").config();

// date + logger level + message

const datformat = () => {
    return new Date(Date.now()).toLocaleString();
};

class loggerService {
    constructor(route) {
        this.route = route;
        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.printf((info) => {
                let message = `${datformat()} | ${info.level.toUpperCase()} | ${
                    info.message
                } `;
                message = info.obj
                    ? ` ${message} ${JSON.stringify(info.obj)}`
                    : message;

                return message;
            }),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: `${process.env.LOG_FILE_PATH} / ${route}.log`,
                }),
            ],
        });
    }

    async info(message) {
        this.logger.log("info", message);
    }

    async info(message, obj) {
        this.logger.log("info", message, { obj });
    }

    async debug(message) {
        this.logger.log("debug", message);
    }

    async debug(message, obj) {
        this.logger.log("debug", message, { obj });
    }

    async error(message) {
        this.logger.log("error", message);
    }

    async error(message, obj) {
        this.logger.log("error", message, { obj });
    }
}

module.exports = loggerService;
