const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const morgan = require("morgan");

morgan("tiny");

// app.use(
//   //
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

var corsOptions = {
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

// app.use(express.static(__dirname));

// Middleware For Error
app.use(errorMiddleware);

module.exports = app;
