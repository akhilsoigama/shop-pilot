import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  productKey: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  discountPrice: { type: Number },
  inStock: { type: Boolean, required: true },
  productImage: {
    type: [String],
    validate: {
      validator: arrayLimit,
      message: "Maximum 5 images are allowed",
    },
    required: true,
  },
  productDescription: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  stripeProductId: { type: String },
  stripePriceId: { type: String },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 5 && val.length >= 1;
}

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
