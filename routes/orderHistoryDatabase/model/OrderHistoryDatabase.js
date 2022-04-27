const mongoose = require("mongoose");
const uuid = require("uuid");

const OrderHistoryDatabaseSchema = new mongoose.Schema(
	{		
		orderItems: {
			type: Array,
		},
		total: {
			type: Number,
			required: true,
		},
		date: {
			type: String,
			require: true,
		}
	}
);

module.exports = mongoose.model(
	"orderHistoryDatabase",
	OrderHistoryDatabaseSchema
);
