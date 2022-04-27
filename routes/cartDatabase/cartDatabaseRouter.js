var express = require("express");
var router = express.Router();
const { isAlpha, isInt } = require("validator");
// bringing in the required utilities
var { jwtMiddleware } = require("../users/lib/authMiddleware");

const {
	getAllCartItems,
	getCartItem,
	addCartItem,
	deleteCartItem,
	emptyCart,
	updateCartItem,
	updateCart,
} = require("./controller/cartDatabaseController");

router.post("/add-cart-item", jwtMiddleware, addCartItem);

router.get("/", jwtMiddleware, getAllCartItems);

router.get("/get-cart-item/:cartTitle", jwtMiddleware, getCartItem);

router.put("/update-cart-item/:id", jwtMiddleware, updateCartItem);
router.delete("/delete-cart-item/:id", jwtMiddleware, deleteCartItem);
router.delete("/empty-cart/", jwtMiddleware, emptyCart);

module.exports = router;
