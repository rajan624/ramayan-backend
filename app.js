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
const chapterRoutes = require("./routes/chapterRoute");
const questionRoutes = require("./routes/questionRoute")
const kandRoutes = require('./routes/kandRoute')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/user", authRouter);
app.use(middleware.Authentication);
app.use("/api/user", userRoute);
app.use("/api/chapters", chapterRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/kand", kandRoutes);

module.exports = app;
