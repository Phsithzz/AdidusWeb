import * as orderService from "../Services/orderService.js"

export const getOrder = async(req,res)=>{
    console.log("/GET /order/admin")
    try {
        const order = await orderService.getOrder()
        res.status(200).json(order)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"Server error getOrder",
            error:err.message
        })
        
    }
}

export const removeOrder = async(req,res)=>{
    console.log("DELETE /order/admin/:orderId")
    try {
        const {orderId}  = req.params
        const deleted = await orderService.remove(orderId)

        if(!deleted){
            return res.status(404).json({
                message:"Order not Found"
            })
        }
        res.status(200).send("DELETED")
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"Server error removeOrder",
            error:err.message
        })
        
    }
}