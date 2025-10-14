import * as cartService from "../Services/cartService.js"

export const checkCart = async(req,res)=>{
    console.log("POST /cart is request")
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

export const updateCartQuantity = async(req,res)=>{
    console.log("PUT /cart/:cartId")
    try {
        const {cartId} = req.params
        const {newQuantity} = req.body

        if(newQuantity == null || newQuantity < 1){
            return res.status(400).json({message:"Invalid quantity"})
        }

        const updateCart  = await cartService.updaeCartQuantity(cartId,newQuantity)
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