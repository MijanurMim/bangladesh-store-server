const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");

dotenv.config({ path: "config/config.env" });

morgan("tiny");

// app.use(
//   //
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

var corsOptions = {
  // origin: "https://bangladesh-store-frontend-lyart.vercel.app",
  origin: "*",
  // optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(fileUpload());
app.use(cors(corsOptions));

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const accessories = require("./routes/accessoriesRoute");
const units = require("./routes/unitPriceRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", accessories);
app.use("/api/v1", units);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware For Error
app.use(errorMiddleware);

module.exports = app;
