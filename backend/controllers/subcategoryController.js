import Subcategory from "../models/subcategoryModel.js";
import Category from "../models/categoryModel.js"; 
import expressAsyncHandler from "express-async-handler";

export const createSubcategory = expressAsyncHandler(async (req, res) => {
  const { subcategoryName, subcategoryImage, categoryId } = req.body;

  if (!subcategoryName || !subcategoryImage || !categoryId) {
    res.status(400);
    throw new Error("Fill all fields (subcategoryName, subcategoryImage, categoryId)");
  }

  
  const category = await Category.findById(categoryId);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  
  const subcategoryExist = await Subcategory.findOne({
    subcategoryName,
    category: categoryId,
  });
  if (subcategoryExist) {
    res.status(400);
    throw new Error("Subcategory already exists under this category");
  }

  // Create the new subcategory
  const newSubcategory = await Subcategory.create({
    subcategoryName,
    subcategoryImage,
    category: categoryId,
  });

  res.status(201).json({
    message: "Subcategory created",
    data: newSubcategory,
  });
});

export const deleteSubcategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params; 

  
  const subcategory = await Subcategory.findById(id);

  if (subcategory) {
    
    await subcategory.deleteOne();
    res.status(200).json({ message: "Subcategory deleted" });
  } else {
    res.status(404);
    throw new Error("Subcategory not found");
  }
});


export const updateSubcategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params; 
  const { subcategoryName, subcategoryImage } = req.body; 

  const subcategory = await Subcategory.findById(id);

  if (subcategory) {
          subcategory.subcategoryName = subcategoryName || subcategory.subcategoryName;
          subcategory.subcategoryImage = subcategoryImage || subcategory.subcategoryImage;

    const updatedSubcategory = await subcategory.save(); 
    res.status(200).json({ message: "Subcategory updated successfully", data: updatedSubcategory });
  } else {
    res.status(404); 
    throw new Error("Subcategory not found");
  }
});
