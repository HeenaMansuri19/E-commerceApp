const productModelSchema = require("../models/productModelSchema");
const userModelSchema = require("../models/userModelSchema");
const vendorModelSchema = require("../models/vendorModelSchema")


//1 API addProduct 
const addProduct = async (req, res) => {
    // const id = req.params.vendorId;
    try {
        const addProduct = await new productModelSchema(req.body)
        const filePath = `/uploads/${req.file.filename}`;
        addProduct.productImage = filePath;
        try {
            await addProduct.save();
            res.status(201).json({
                success: true,
                message: "Product added successfully",
                productData: addProduct
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "error occur" + err.message
            });
        }
    } catch (err) {
        console.log(err.message)
    }
}

//2 productList 
const getProduct = async (req, res) => {
    try {
        const existsProduct = await productModelSchema.find();
        res.status(200).json({
            success: "success",
            message: "The displayed lists of product are here",
            "data": existsProduct
        })
    } catch (error) {
        console.log(error.message);
    }
}

//3.Details of product
const productDetails = async (req, res) => {
    try {
        const productData = await productModelSchema.findById(req.params.vid)
            .populate({
                path: "vendorId",
                select: "vendorName vendorEmail city",
            })

        res.status(200).json({
            success: true,
            message: "Product details are displayed here",
            productData: productData
        });
    } catch (err) {
        res.status(401).json({
            success: false,
            error: "Error occur" + err.message,
        });
    }
}

//4.delete product
const deleteProduct = async (req, res) => {
    const pid = req.params.pid;
    try {
        const productDelete = await productModelSchema.findByIdAndDelete(pid, { $set: req.body });
        res.status(201).json({
            success: true,
            message: "Product is deleted successfully!!",
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
}

module.exports = {
    addProduct,
    getProduct,
    productDetails,
    deleteProduct
}