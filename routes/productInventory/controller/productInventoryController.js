const { isAlpha, isInt } = require("validator");

const ProductInventory = require("../model/ProductInventory");
const User = require("../../users/model/User");
const errorHandler = require("../../utils/errorHandler/errorHandler");

async function getAllProducts(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		// let foundUser = await User.findOne({ email: decodedData.email })
		// ;
		
		let foundProducts = await ProductInventory.find();
	
res.json({ message: "success", payload: foundProducts });
	} catch (e) {
		console.log(e)
	}	
}

async function getMeal(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });
		let userMealArray = foundUser.mealList;
		let filterArray = userMealArray.filter(
			(item) => item._id.toString() !== req.params.id
		);

		foundUser.mealList = filterArray;
		await foundUser.save();
		let foundMeal = await Meals.findById(req.params.id);

		res.json({
			message: "success",
			payload: foundMeal,
		});
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}

async function addProduct(req, res) {
	try {

		const decodedData = res.locals.decodedData;
		
		// let foundUser = await User.findOne({ email: decodedData.email });

		let createdProduct = new ProductInventory({
			category: req.body.category,
			title: req.body.title,
			brand: req.body.brand,
			description: req.body.description,
			image: req.body.image,
			price: req.body.price,
		});
		
		let savedProduct = await createdProduct.save();

		// foundUser.productList.push(savedProduct._id);

		// await foundUser.save();
		console.log("savedProduct: ", savedProduct);
		res.json({ message: "success", payload: savedProduct });
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}
async function deleteMeals(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });
		let userMealArray = foundUser.mealList;
		let filterArray = userMealArray.filter(
			(item) => item._id.toString() !== req.params.id
		);

		foundUser.mealList = filterArray;
		await foundUser.save();
		let deletedMeal = await Meals.findByIdAndRemove(req.params.id);
	
		res.json({
		message: "success",
		payload: deletedMeal,
	});
		
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}
async function updateMeals(req, res) {
	try {
		let foundMeal = await Meals.findById(req.params.id);

		if (!foundMeal) {
			res.status(404).json({ message: "failure", error: "Meal not found" });
		} else {
			let updatedMeal = await Meals.findByIdAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
				}
			);

			res.json({ message: "success", payload: updatedMeal });
		}
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}

module.exports = {
	getAllProducts,
	getMeal,
	addProduct,
	deleteMeals,
	updateMeals,
};
