const express = require("express");
const cors = require("cors");
const storeRoute = require("./src/routes/storeRoute");
const bookRoute = require("./src/routes/bookRoute");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1", storeRoute);
app.use("/api/v1", bookRoute);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
