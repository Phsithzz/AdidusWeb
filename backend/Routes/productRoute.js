import express from "express";
import * as productController from "../Controllers/productController.js";

const router = express.Router();

// 🟢 Routes สำหรับ admin ก่อน
router.post("/products/admin", productController.upload,productController.createProduct);
router.get("/products/admin", productController.getProductAdmin);
router.put("/products/admin/:productId",productController.upload, productController.updateProduct);

// 🟢 Routes เฉพาะเจาะจง
router.get("/products/show", productController.getProductShow);
router.get("/products/search", productController.searchProduct);
router.get("/products/brand/:brand", productController.getProductBrand);
router.get("/products/type/:description", productController.getProductType);

// 🟢 Routes ทั่วไป (ควรอยู่ท้ายสุด)
router.get("/products", productController.getProduct);
router.get("/products/:id", productController.getProductId);
router.delete("/products/:productId", productController.deleteProduct);

export default router;
