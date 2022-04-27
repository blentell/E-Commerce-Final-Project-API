const mongoose = require("mongoose");
const uuid = require("uuid");

const ProductInventorySchema = new mongoose.Schema(
	{
		category: {
			type: String,
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
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("productInventory", ProductInventorySchema);
