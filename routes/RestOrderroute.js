const express = require("express");
const router = express.Router();

//require controllers

const {
  saveOrder,
  getOrdersByUser,
} = require("../controller/restOrderController");
router.post("/order", saveOrder);

router.get("/getorder/:id", getOrdersByUser);

module.exports = router;
