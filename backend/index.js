const express = require("express");
const cors = require("cors");
const { Connection } = require("./Configuration/db");
const { UserRoute } = require("./Routes/user");
const { PostCarRoute } = require("./Routes/PostCar");
const { OemRouter } = require("./Routes/oemSpecs");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To BuyCars.com");
});

// User Route //
app.use("/user", UserRoute);
app.use("/sellcar", PostCarRoute);
app.use("/oem", OemRouter);

// handling Fall back or undefined Routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: { message: error.message } });
});

app.listen(PORT, async () => {
  try {
    await Connection;
    console.log("Connected To Database");
    console.log(`server is running at ${PORT}`);
  } catch (err) {
    console.log(`Error while connecting to Database ${err}`);
  }
});
