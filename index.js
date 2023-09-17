const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./db");
const path = require("path");
//mongoose db connection
connectDB();

//
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

//.env config
dotenv.config();
//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

//get app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);
//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `server connected to ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white
  );
});
