const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        resto_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        foodItemIds:{
            type:String,
            required:[true,'foodItem id are required']
        },
        status:String,
        amount:String

    },
    { timestamps: true }
);

export const Orders = mongoose.models.orders || mongoose.model('orders', OrderSchema);
