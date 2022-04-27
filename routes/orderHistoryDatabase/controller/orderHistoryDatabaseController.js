const { isAlpha, isInt } = require("validator");

const User = require("../../users/model/User");
const OrderHistory = require("../model/OrderHistoryDatabase");
const errorHandler = require("../../utils/errorHandler/errorHandler");
const { json } = require("express/lib/response");

async function getAllHistory(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email }).populate(
			"orderHistoryList",
			"-orderHistoryOwner -_v"
		);
		let foundOrderHistoryItems = await OrderHistory.find({
		
		}).populate({
			path: "orderItems"});
		
console.log("foundOrderHistoryItems: ", foundOrderHistoryItems);
		res.json({ message: "success", payload: foundOrderHistoryItems });
	} catch (e) {
		console.log(e);
	}
}

async function getOrder(req, res) {
	try {

		const orderId = req.params.orderId
		let foundOrder = await OrderHistory.findOne({
			_id: orderId
		})

res.send({message: "success", payload: foundOrder})


	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}
async function addCartToHistory(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email }).populate(
			"orderHistoryList",
			"-orderHistoryOwner -_v"
		);

		let createdOrderHistoryItems = new OrderHistory(				
			{orderItems: req.body.shoppingCart, total: req.body.total, date: req.body.date}
		);
		
		let savedOrderHistoryItem = await createdOrderHistoryItems
			.save()
		
		console.log("savedOrderHistoryItems: ", savedOrderHistoryItem);
		foundUser.orderHistoryList.push(savedOrderHistoryItem._id);
		await foundUser.save();
		// let foundOrderHistoryItems = await OrderHistory.find({
			
		// });
console.log("add-foundOrderHistory: ", savedOrderHistoryItem);
		res.json({ message: "success", payload: savedOrderHistoryItem });
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}

module.exports = {
	getAllHistory,
	addCartToHistory,
	getOrder,
};
