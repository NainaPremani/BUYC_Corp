require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Connection } = require("./Configuration/db");
const User = require("./Routes/user");
const { isAuthenticated } = require("./middlewares/auth");
const Oem = require("./Routes/oemSpecs");
const oldCars = require("./Routes/oldCar");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

// Public routes
app.use("/users", User);

// private Routes
app.use("/cars", isAuthenticated, Oem);
app.use("/oldCars", isAuthenticated, oldCars);


//Home Route
app.get("/",(req,res)=>{
    res.send("Welcome To Buy Car Corp.")
})

// handling Fall back or undefined Routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: { message: error.message } });
});

app.listen(PORT, async()=>{
    try{
   await Connection
   console.log('Connected To Database')
   console.log(`server is running at http://localhost:${PORT}`)
    }
    catch(err){
        console.log(`Error while connecting to Database ${err}`)
    }
})
