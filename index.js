const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// require("dotenv").config();
// config
dotenv.config({ path: "config/config.env" });

// const port = process.env.PORT || 4000;
const cloudinary = require("cloudinary");

// cors
// cors config
var corsOptions = {
  origin: "https://bangladeshstorensd.com",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Handle Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting Down The Server Due to Uncaught Exception`);

  process.exit(1);
});

const start = async () => {
  if (!process.env.MONGO_URL) {
    console.log("MONGO URL must be defined");
  }

  // database connection
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Server Connected To MongoDb Database");
  } catch (err) {
    console.log(err);
  }

  // Starting the server
  app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port : ${process.env.PORT} `);
  });
};
start();

// Cloudninary Connection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down The Server Due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
