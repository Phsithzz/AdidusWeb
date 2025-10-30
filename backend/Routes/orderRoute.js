import express from "express"
import * as orderController from "../Controllers/orderController.js"

const router = express.Router()

router.get("/order/admin",orderController.getOrder)
router.delete("/order/admin/:orderId",orderController.removeOrder)




export default router