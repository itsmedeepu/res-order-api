const express = require("express");
const router = express.Router();
//controllers
const {
  register,
  Login,
  AdminDashboard,
} = require("../controller/AdminController");

//middlewares
const { auth } = require("../middleware/Admin");

router.get("/login");

router.get("/dashboard");

router.post("/register", register);

router.post("/login", Login);

router.get("/dashboard", auth, AdminDashboard);

module.exports = router;
