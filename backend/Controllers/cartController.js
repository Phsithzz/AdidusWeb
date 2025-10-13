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