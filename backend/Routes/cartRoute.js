import express from "express";
import * as cartController from "../Controllers/cartController.js";

const router = express.Router();

// 🔹 Route ฝั่ง admin (static path)
router.post("/cart/admin", cartController.createCart);
router.get("/cart/admin", cartController.getAllCart);
router.put("/cart/admin/:cartId", cartController.updateCart);
router.delete("/cart/admin/:cartId", cartController.removeCart);

// 🔹 Route สำหรับลูกค้า (static ก่อน dynamic)
router.get("/cart/order/:customerEmail",cartController.getCartOrder)
router.post("/cart/checkcart", cartController.checkCart);
router.post("/cart/addcart", cartController.addCart);
router.put("/cart/confirm/:customerEmail", cartController.confirmCart);

// 🔹 Route ที่มี dynamic param ไว้ล่างสุด
router.get("/cart/:customerEmail", cartController.getCart);
router.put("/cart/:cartId", cartController.updateCartQuantity);

export default router;
