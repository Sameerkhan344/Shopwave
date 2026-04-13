import { deleteImageOnCloudinary, uploadImageOnCloudinary } from "../helper/cloudinaryHelper.js";
import productsModel from "../models/productsModel.js"

const addProductController = async (req, res) => {
    try {
        const { title, description, category, price } = req.body;
        const picture = req.file?.fieldname;
        const picturePath = req.file?.path;
        //checking if any field missing
        if (!title || !description || !category || !price || !picture || !picturePath) {
            return res.status(400).send({ success: false, message: "All fields are required" })
        }

        //uploading image on cloudinary

        const { secure_url, public_id } = await uploadImageOnCloudinary(picturePath, "products");
        if (!secure_url) {
            return res.status(400).send({ success: true, message: "Error while uploding image", error: secure_url })
        }
        const product = await productsModel.create({
            title, description, category, price, user: req.user._id, picture: {
                secure_url,
                public_id
            }
        })
        return res.status(201).send({ success: true, message: "Product uploaded successfully", product })
    } catch (err) {
        console.log(`addProductController Error ${err}`)
        return res.status(400).send({ success: false, message: "error in addProductController", err })
    }
}

//get All Product
const getAllProductController = async (req, res) => {
    try {
        //checking same category exist or not ? ---
        const products = await productsModel.find({}).populate("user", "name email").populate("category", "name");

        return res.status(200).send({
            success: true,
            message: "All Products fetched successfully",
            total: products.length,
            products
        })
    } catch (err) {
        console.log(`getAllProductController Error - ${err}`)
        return res.status(400).send({ success: false, message: "error in getAllProductController", err })
    }
}

//delete single products
const deleteProductController = async (req, res) => {
    try {
        const { productId } = req.params;

        //checking if Category missing
        const product = await productsModel.findById(productId);
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not found" })
        }
        //delete product image from cloudinary
        if (product?.picture?.public_id) {
            await deleteImageOnCloudinary(product?.picture?.public_id);
        }
        //now delete from database
        await productsModel.findByIdAndDelete(productId);

        return res.status(200).send({ success: true, message: "Product deleted successfully" })

    } catch (err) {
        console.log(`deleteProductController Error - ${err}`)
        return res.status(400).send({ success: false, message: "error in deleteProductController", err })
    }
}
//get single products details
const getSingleProductController = async (req, res) => {
    try {
        const { productId } = req.params;

        //checking if Category missing
        const product = await productsModel.findById(productId).populate("user", "name").populate("category", "name");
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not found" })
        }

        return res.status(200).send({ success: true, message: "Single product details fetched successfully", product })

    } catch (err) {
        console.log(`getSingleProductController Error - ${err}`)
        return res.status(400).send({ success: false, message: "error in getSingleProductController", err })
    }
}
//update products
const updateProductController = async (req, res) => {
    try {
        const { productId } = req.params;
        const { title, description, category, price } = req.body;
        const picturePath = req.file?.path;

        const product = await productsModel.findById(productId);
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not fond" })
        }
        if (title) product.title = title;
        if (description) product.description = description;
        if (category) product.category = category;
        if (price) product.price = price;
        //upload new image in cloudinary
        if (picturePath) {
            const { secure_url, public_id } = await uploadImageOnCloudinary(
                picturePath,
                "products"
            );
            //delete old or previous image from cloudinary
            if (product?.picture?.public_id) {
                await deleteImageOnCloudinary(product.picture?.public_id)
            }
            product.picture = {
                secure_url, public_id
            }
        }
        await product.save(); //now save all the code we done
        return res.status(200).send({ success: true, message: "product details upload successfully" })
    } catch (err) {
        console.log(`updateProductController Error ${err}`)
        return res.status(400).send({ success: false, message: "error in updateProductController", err })
    }
}
export { addProductController, getAllProductController, deleteProductController, getSingleProductController, updateProductController }