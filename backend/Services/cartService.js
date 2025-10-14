import {query} from "../Config/database.js"

//C R U D

export const checkCart = async(email)=>{
    const {rows} = await query(
        "SELECT * FROM cart WHERE customer_email = $1 AND status != true",[email]
    )

    return rows[0] || null
}

export const addCart = async(cartData)=>{
    const {customer_email,variant_id,quantity,price} = cartData
    
    const findExist = await query(`
        SELECT * FROM cart 
        WHERE customer_email=$1 AND variant_id=$2 AND status=FALSE 
        `,[customer_email,variant_id])
    
    const {rows:existItems} = findExist
    const existItem = existItems[0]

    if(existItem){
        const newQuantity = existItem.quantity + quantity
        const {rows} = await query(`
            UPDATE cart
            SET quantity=$1
            WHERE cart_id=$2
            RETURNING*
            `,[newQuantity,existItem.cart_id])
        return rows[0]
    }   
    else{
        const {rows} = await query(`
            INSERT INTO cart(customer_email,variant_id,quantity,price)
            VALUES($1,$2,$3,$4) RETURNING*
            `,[customer_email,variant_id,quantity,price])
        return rows[0]
    }

}

export const getCart = async(customerEmail)=>{
    const {rows} = await query(`
        SELECT c.cart_id,c.quantity, c.price,p.name,p.image_filename,p.name,v.size
        FROM cart c
        JOIN product_variants v ON c.variant_id = v.variant_id
        JOIN products p ON v.product_id = p.product_id
        WHERE c.customer_email = $1 AND c.status = FALSE
        `,[customerEmail])
    return rows    
}

export const updaeCartQuantity = async(cartId,newQuantity)=>{
    const {rows} = await query(`
        UPDATE cart SET quantity = $1 WHERE cart_id = $2 RETURNING*
        `,[newQuantity,cartId])
    return rows || null
}

export const removeCart = async(cartId)=>{
    const {rowCount} = await query("DELETE FROM cart WHERE cart_id = $1",[cartId])
    return rowCount > 0
}
