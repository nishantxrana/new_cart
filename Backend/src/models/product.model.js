import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["men", "women", "kids"],
    },
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    percentOff: {
      type: Number,
      required: true,
      default: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.percentOff = Math.round(((this.mrp - this.salePrice) / this.mrp) * 100);
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
