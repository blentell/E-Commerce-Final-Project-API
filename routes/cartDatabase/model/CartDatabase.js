const mongoose = require("mongoose");
const uuid = require("uuid");

const CartDatabaseSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			default: ()=>uuid.v4()
		},
		title: {
			type: String,
		},
		brand: {
			type: String,
		},
		description: {
			type: String,
		},
		image: {
			type: String,
		},
		price: {
			type: Number,
		},
		quantity: {
			type: Number,
			required: true,
		},
		cartOwner: {
			type: mongoose.Schema.ObjectId,
			ref: "user",
		},
	},
	{
		timestamps: true,
	}
);

const CartModel = mongoose.model("cartDatabase", CartDatabaseSchema);
module.exports = CartModel;