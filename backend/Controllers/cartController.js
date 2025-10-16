import * as cartService from "../Services/cartService.js"

//เอาไว้ใช้เช็คว่า user มีตระกร้าอยู่่แล้วรึป่าว
export const checkCart = async(req,res)=>{
    console.log("POST /cart/checkcart is request")
    try {
        const {email} = req.body
        if(!email){
            return res.json({
                error:true,
                errormessage:"User Email is required"
            })
        }

        const newcart = await cartService.checkCart(email)
        if(newcart != null){
            return res.json({
                cartExist:true,
                cart_id:newcart.cart_id
            })
        }
        else{
            return res.json({
                cartExist:false
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"Server error checkCart",
            error:err.message
        })
        
    }
}

//เอาไว้เพิ่มข้อมูลลงในตระกร้าของuser แต่ละคน และมีการเพิ่ม ปริมาณสินค้าถ้าในตระกร้ามีสินค้าอยู่แล้ว
export const addCart = async(req,res)=>{
    console.log("POST /cart/addcart is request")
    try {
        const cartData = req.body
        if(cartData.customer_email == null){
            return res.json({
                cartOK:false,messageAddCart:"Customer Email is required"
            })
        }
        const newcart = await cartService.addCart(cartData)
        res.json({cartOK:true,
            messageAddCart:newcart})

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"Server error addCart",
            error:err.message,
            cartOK:false,
            
        })
        
    }
}

//เอาไว้ใช้ตอนโชว์สินค้าของลูกค้าแต่ละคน
export const getCart  = async(req,res)=>{
    console.log("GET /cart/:customerEmail")
    try {
        const {customerEmail} = req.params
        const cart = await cartService.getCart(customerEmail)
        res.status(200).json(cart)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"Server error getCart",
            error:err.message
        })
        
    }
}

//เอาไว้ใช้อัพเดทปริมาณสินค้าในตระกร้า
export const updateCartQuantity = async(req,res)=>{
    console.log("PUT /cart/:cartId")
    try {
        const {cartId} = req.params
        const {newQuantity} = req.body

        if(newQuantity == null || newQuantity < 1){
            return res.status(400).json({message:"Invalid quantity"})
        }

        const updateCart  = await cartService.updateCartQuantity(cartId,newQuantity)
        if(!updateCart){
            return res.status(404).json({message:"Cart item not found"})
        }
        res.status(200).json(updateCart)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"Server error updataCartQuantity",
            error:err.message
        })
        
    }
}

//เอาไว้ออัพเดต Status ของตะกร้า เมื่อผู้ใช้กดซื้อและชำระเงินสำเร็จ แล้วเพิ่มข้อมูลลงtable orders
export const confirmCart = async(req,res)=>{
    console.log("PUT /cart/confirm/:customerEmail is request")
    try {
        const {customerEmail} = req.params
        const order = await cartService.confirmCart(customerEmail)
        if(!order) return res.status(400).json({message:"No item to confirm"})
        res.status(200).json(order)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"Server error confirmCart",
            error:err.message
        })
        
    }
}
//C R U D 

//Admin use
export const removeCart = async(req,res)=>{
    console.log("DELETE /cart/:cartId")
    try {
        const {cartId} = req.params
        const deleted = await cartService.removeCart(cartId)
        if(!deleted){
            return res.status(404).json({message:"Cart not Found"})
        }
        res.status(200).json({message:"Cart deleted"})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"Server error removeCart",
            error:err.message
        })
        
    }
}

//Admin use