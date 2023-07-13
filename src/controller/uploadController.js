const Logger = require("../services/loggerService");
const logger = new Logger("uploadController");
const multer = require("multer");

exports.uploadFile = async (req, res) => {
    try {
        const upload = multer({ dest: process.env.UPLOAD_PATH }).single(
            "photo"
        );
        upload(req, res, (next) => {
            try {
                console.log(";;;;;;;;;;;;;;;;");
                const path = req.file.path;
                const file = req.file;
                // Save file in directory
                // Save metadata in db [filename (rename), size, mimitype, path]
                console.log(path);
                console.log(file);
                return res
                    .status(200)
                    .send({ data: "File is uploaded successfully" });
            } catch (error) {
                throw error;
            }
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).send({ error: "Failed to upload file" });
    }
};
