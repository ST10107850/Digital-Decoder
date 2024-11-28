import Category from "../models/categoryModel.js";
import expressAsyncHandler from "express-async-handler";

export const createCategory = expressAsyncHandler(async (req, res) => {
  const { categoryName, categoryImage } = req.body;

  if (!categoryName || !categoryImage) {
    res.status(400);
    throw new Error("Fill all fields.....");
  }

  const categoryExist = await Category.findOne({ categoryName });
  if (categoryExist) {
    res.status(400);
    throw new Error("Category already exists");
  } else {
    const newCategory = await Category.create({
      categoryName,
      categoryImage,
    });

    res.status(200).json({ message: "Category created", data: newCategory });
  }
});

export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params; 

  
  const category = await Category.findById(id);

  if (category) {
    
    await category.deleteOne();
    res.status(200).json({ message: "Category deleted" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});


export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params; 
  const { categoryName, categoryImage } = req.body; 

  const category = await Category.findById(id);

  if (category) {
    category.categoryName = categoryName || category.categoryName;
    category.categoryImage = categoryImage || category.categoryImage;

    const updatedCategory = await category.save(); 
    res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
  } else {
    res.status(404); 
    throw new Error("Category not found");
  }
});

export const getCategories = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find(); // Fetching all categories from the database
    if (categories.length === 0) {
      res.status(404);
      throw new Error("No categories found");
    }
    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories, // Sending the list of categories back
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching categories");
  }
});