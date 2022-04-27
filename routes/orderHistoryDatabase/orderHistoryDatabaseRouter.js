var express = require("express");
var router = express.Router();
const { isAlpha, isInt } = require("validator");
// bringing in the required utilities
var { jwtMiddleware } = require("../users/lib/authMiddleware");

const {
	addCartToHistory,
	getAllHistory,
	getOrder,
} = require("./controller/orderHistoryDatabaseController");

router.post("/add-cartToHistory", jwtMiddleware, addCartToHistory);

router.get("/", jwtMiddleware, getAllHistory);

router.get("/get-order/:orderId", jwtMiddleware, getOrder);

module.exports = router;
