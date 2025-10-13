import express from "express"
import * as cartController from "../Controllers/cartController.js"

const router = express.Router()

router.post("/cart/checkcart",cartController.checkCart)
router.post("/cart/addcart",cartController.addCart)

export default router