const { isAlpha, isInt } = require("validator");

const Cart = require("../model/CartDatabase");
const User = require("../../users/model/User");
const errorHandler = require("../../utils/errorHandler/errorHandler");

async function getAllCartItems(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email }).populate(
			"cartList",
			"-cartOwner -_v"
		);

		let foundCartItems = await Cart.find({ cartOwner: foundUser._id });

		res.json({ message: "success", payload: foundCartItems });
	} catch (e) {
		console.log(e);
	}
}

async function getCartItem(req, res) {
	try {
		const decodedData = res.locals.decodedData;
		let foundUser = await User.findOne({ email: decodedData.email }).populate(
			"cartList",
			"-cartOwner -_v"
		);

		let userCartItemArray = foundUser.cartList;
		let filterArray = userCartItemArray.filter(
			(item) => item._id.toString() !== req.params.id
		);

		foundUser.cartList = filterArray;
		await foundUser.save();

		let cartVariable = req.params.cartTitle;

		let foundCartItem = await Cart.find({
			cartOwner: foundUser._id,
			cartTitle: {
				$regex: new RegExp(cartVariable, "i"),
			},
		});

		res.json({
			message: "success",
			payload: foundCartItem,
		});
	} catch (e) {
		console.log("error: ", e);
		res.status(500).json(errorHandler(e));
	}
}

async function addCartItem(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email }).populate(
			"cartList",
			"-cartOwner -_v"
		);
		let userCartItemIdList = foundUser.cartList;
		let itemIndex = foundUser.cartList.findIndex(
			(item) => item.title == req.body.title
		);
		console.log("itemIndex: ", itemIndex);

		if (itemIndex > -1) {
			// product exists in the cart, update the quantity
			let productItem = foundUser.cartList[itemIndex];
			productItem.quantity = productItem.quantity + 1;
			foundUser.cartList[itemIndex] = productItem;

			let savedUpdate = await productItem.save();
			foundUser.cartList.push(savedUpdate);
	

		} else {
			let createdCartItem = new Cart({
				id: req.body.id,
				title: req.body.title,
				brand: req.body.brand,
				description: req.body.description,
				image: req.body.image,
				price: req.body.price,
				quantity: 1,
				cartOwner: foundUser._id,
			});
			let savedCartItem = await createdCartItem.save();

			foundUser.cartList.push(savedCartItem._id);
		}
		// console.log("savedCartItem:", savedCartItem);
		await foundUser.save();
		let foundCartItems = await Cart.find({ cartOwner: foundUser._id });

			console.log("productItem: ", foundUser.cartList);

		res.json({ message: "success", payload: foundCartItems });
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}
async function deleteCartItem(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });
		let itemIndex = foundUser.cartList.findIndex(
			(item) => item._id.toString() == req.params.id
		);
		console.log("itemIndex: ", itemIndex);

			let userCartItemIdList = foundUser.cartList;
			let filterArray = userCartItemIdList.filter(
				(item) => item._id.toString() !== req.body.id
			);

			foundUser.cartList = filterArray;
			await foundUser.save();
			let deletedCartItem = await Cart.findByIdAndRemove(req.params.id);
			let foundCartItems = await Cart.find({ cartOwner: foundUser._id });
	
		res.json({
			message: "success",
			payload: foundCartItems,
		});
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}
async function emptyCart(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });
		let userCartItemIdList = foundUser.cartList;
		
		
		foundUser.cartList = [];
		let emptiedCart = await Cart.deleteMany();
		
		await foundUser.save();
		let foundCartItems = await Cart.find({ cartOwner: foundUser._id });
		console.log("foundCartItems: ", foundCartItems);
		console.log("cartList2: ", userCartItemIdList);

		res.json({
			message: "success",
			payload: foundCartItems,
		});
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}
async function updateCartItem(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });
		let foundCartItem = await Cart.findById(req.params.id);

		if (!foundCartItem) {
			res.status(404).json({ message: "failure", error: "Item not found" });
		} else {
			let updatedCartItem = await Cart.findByIdAndUpdate(
				req.params.id,
				{quantity: req.body.quantity},
				{
					new: true,
				}
			);
			
			await foundUser.save();
			let foundCartItems = await Cart.find({ cartOwner: foundUser._id });

console.log("updatedCartItem: ", foundCartItems);
			res.json({ message: "success", payload: foundCartItems });
		}
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}

module.exports = {
	getAllCartItems,
	getCartItem,
	addCartItem,
	deleteCartItem,
	emptyCart,
	updateCartItem,
};
