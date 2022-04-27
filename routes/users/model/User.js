const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		username: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},
		cartList: [{ type: mongoose.Schema.ObjectId, ref: "cartDatabase" }],
		orderHistoryList: [{ type: mongoose.Schema.ObjectId, ref: "orderHistoryDatabase" }],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("user", userSchema);