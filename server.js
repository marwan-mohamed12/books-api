const express = require("express");
const cors = require("cors");
const storeRoute = require("./src/routes/storeRoute");
const bookRoute = require("./src/routes/bookRoute");
const userRoute = require("./src/routes/userRoute");
const loginRoute = require("./src/routes/loginRoute");
const uploadRoute = require("./src/routes/uploadRoute");
const exportRoute = require("./src/routes/exportRoute");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1", storeRoute);
app.use("/api/v1", bookRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", loginRoute);
app.use("/api/v1", uploadRoute);
app.use("/api/v1", exportRoute);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
