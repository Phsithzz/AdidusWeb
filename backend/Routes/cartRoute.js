import express from "express"
import * as cartController from "../Controllers/cartController.js"
//import

const router = express.Router()

router.post("/cart/checkcart",cartController.checkCart)

router.post("/cart/addcart",cartController.addCart)

router.get("/cart/:customerEmail",cartController.getCart)

router.put("/cart/:cartId",cartController.updateCartQuantity)

router.delete("/cart/:cartId",cartController.removeCart)

export default router