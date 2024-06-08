const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoute");
const middleware = require("./Middleware/verifyAuthentication");
const userRoute = require("./routes/userRoute");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const { title } = require("process");
const { version } = require("os");
app.disable("x-powered-by");
const corsOptions = {
  origin: ["http://localhost:3000"], // Replace with your frontend domain
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "Static")));

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Ramayana Backend API",
//       version: "1.0.0",
//       description: "Hello Brother what's up",
//     },
//     servers: [
//       {
//         url: "http://localhost:4000",
//         description: "Local Server",
//       },
//       {
//         url: "https://ramayan-backend.onrender.com",
//         description: "Dev Server",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };

// const swaggerSpec = swaggerJSDoc(swaggerOptions);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/user", authRouter);
app.use(
  middleware.Authentication /* 
  #swagger.tags = ['someTag']

  #swagger.security = [{
      "apiKeyAuth": []
  }] 
  */
);
app.use("/api/user", userRoute);

module.exports = app;
