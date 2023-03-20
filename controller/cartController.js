const cartModelSchema = require('../models/cartModelSchema')

const addCart = async (req, res) => {
    try {
        const cartAdd = await new cartModelSchema(req.body)
        cartAdd.userId = req.params.userId
        cartAdd.productId = req.params.productId
        try {
            await cartAdd.save()
            res.status(201).json({
                success: true,
                message: "Cart added successfully"
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "Error occur" + err.message,
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Error occur" + err.message,
        });
    }
}

const cartList = async (req, res) => {
    try {
        const existsCart = await cartModelSchema.find();
        res.status(200).json({
            success: true,
            message: "The displayed lists of cart is here.",
            getCart: existsCart
        })
    } catch (error) {
        console.log(error.message)
    }
}

const editCart = async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const newCart = await cartModelSchema.findByIdAndUpdate(cartId, { $set: req.body });
        newCart.save();
        res.status(201).json({
            success: true,
            message: "Cart edited successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        })
    }
}

const deleteCart = async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const cartDelete = await cartModelSchema.findByIdAndDelete(cartId, { $set: req.body });
        res.status(201).json({
            success: true,
            message: "Cart is deleted successfully!!",
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
module.exports = {
    addCart,
    cartList,
    editCart,
    deleteCart
}
