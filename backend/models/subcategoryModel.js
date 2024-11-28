import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Categories",
    },
    subcategoryName: {
      type: String,
      required: true,
    },
    subcategoryImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Subcategory = mongoose.model("Subcategories", subcategorySchema);

export default Subcategory;
