var express = require("express");
var router = express.Router();
const { isAlpha, isInt } = require("validator");
// bringing in the required utilities
var { jwtMiddleware } = require("../users/lib/authMiddleware");

const {
	getAllProducts,
	getMeal,
	addProduct,
	deleteMeals,
	updateMeals,
} = require("./controller/productInventoryController");

router.post("/add-product", jwtMiddleware, addProduct);

router.get("/", getAllProducts);

router.get("/get-meal/:id", jwtMiddleware, getMeal);

router.put("/update-meal/:id", jwtMiddleware, updateMeals);

router.delete("/delete-meal/:id", jwtMiddleware, deleteMeals);


module.exports = router;

