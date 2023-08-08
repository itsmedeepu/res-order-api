require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 2000;

//to access data in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({}));

//require database connection
require("./db/conn");

//require order routes

const orderroute = require("./routes/RestOrderroute");

//require admin routes

const AdminRoutes = require("./routes/AdminRoute");
//import order route
app.use("/rest", orderroute);

//use admin routes

app.use("/admin", AdminRoutes);

app.get("/", (req, res) => {
  res.send("im working fine");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
