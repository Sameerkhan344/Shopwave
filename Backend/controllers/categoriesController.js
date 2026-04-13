import slugify from "slugify";
import categoriesModel from "../models/categoriesModel.js";

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        //checking if any field missing
        if (!name) {
            return res.status(400).send({ success: false, message: "Category name fields required" })
        }

        //checking same category exist or not ? ---
        const isExist = await categoriesModel.findOne({ name });
        if (isExist) {
            return res.status(400).send({ success: false, message: "Category already Exist" })
        }

        //creating new category ---
        const category = await categoriesModel.create({
            name,
            slug: slugify(name, { lower: true, strict: true })
        }); //categoriesModel ki help se user create kiya hai ---
        return res.status(201).send({ success: true, message: "Category created successfully", category })
    } catch (err) {
        console.log(`createCategoryController Error - ${err}`)
        return res.status(400).send({ success: false, message: "error in createCategoryController", err })
    }
}


const getAllCategoriesController = async (req, res) => {
    try {
        //checking same category exist or not ? ---
        const categories = await categoriesModel.find({});

        return res.status(201).send({ success: true, message: "Category fetched successfully", categories })
    } catch (err) {
        console.log(`getAllCategoriesController Error - ${err}`)
        return res.status(400).send({ success: false, message: "error in getAllCategoriesController", err })
    }
}


//delete single category
const deleteCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;

        //checking if Category missing
        const category = await categoriesModel.findOneAndDelete({ slug });
        if (!category) {
            return res.status(400).send({ success: false, message: "Category not found" })
        }

        return res.status(200).send({ success: true, message: "Category deleted successfully", category })
    } catch (err) {
        console.log(`deleteCategoryController Error - ${err}`)
        return res.status(400).send({ success: false, message: "error in deleteCategoryController", err })
    }
}


//find single category for update slug
const getSingleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;

        //checking if Category missing
        const category = await categoriesModel.findOne({ slug });
        if (!category) {
            return res.status(400).send({ success: false, message: "Category not found" })
        }

        return res.status(200).send({ success: true, message: "Category fetched successfully", category })
    } catch (err) {
        console.log(`getSingleCategoryController Error - ${err}`)
        return res.status(400).send({ success: false, message: "error in getSingleCategoryController", err })
    }
}
//update category
const updateCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const { name } = req.body;

        //checking if any field missing
        if (!name) {
            return res.status(400).send({ success: false, message: "Category name is required" })
        }

        //creating new category ---
        const category = await categoriesModel.findOneAndUpdate(
            { slug },
            { name, slug: slugify(name, { lower: true, strict: true }) },
            { new: true }
        );
        if (!category) {
            return res.status(404).send({ success: false, mesage: "category is not found" })
        }
        //categoriesModel ki help se user create kiya hai ---
        return res.status(201).send({ success: true, message: "Category updated successfully", category })
    } catch (err) {
        console.log(`updateCategoryController Error - ${err}`)
        return res.status(400).send({ success: false, message: "error in updateCategoryController", err })
    }
}
export { createCategoryController, getAllCategoriesController, deleteCategoryController, updateCategoryController, getSingleCategoryController }