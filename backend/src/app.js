const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./swagger-doc/options");

// Import routes
const routes = require("./routes");

// Middlewares
const { notFoundMiddleware, errorMiddleware } = require("./middlewares");

// API config
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" }));

// API routes
app.get("/", (req, res) => {
  res.send("Tennis League");
});
app.use("/api/v1", routes);

// Swagger documentation route
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Handle errors
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Start Api
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Server start on port ${port}`));
}

module.exports = app;
