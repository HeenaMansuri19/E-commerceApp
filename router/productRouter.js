const express = require('express');
const router = express.Router()
const product = require('../controller/productController')
const { upload } = require('../middlewares/imageStorage');

router.post("/addProduct",upload.array("productImage"),product.addProduct)
router.get("/getProduct",product.getProduct)
router.get("/productdetails/:vid",product.productDetails)
router.delete("/deleteproduct/:pid",product.deleteProduct)
router.patch("/editproduct/:id",product.editProduct)

module.exports = router;