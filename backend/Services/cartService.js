import {query} from "../Config/database.js"



//เอาไว้ใช้เช็คว่า user มีตระกร้าอยู่่แล้วรึป่าว
export const checkCart = async(email)=>{
    const {rows} = await query(
        "SELECT * FROM cart WHERE customer_email = $1 AND status != true",[email]
    )

    return rows[0] || null
}

//เอาไว้เพิ่มข้อมูลลงในตระกร้าของuser แต่ละคน และมีการเพิ่ม ปริมาณสินค้าถ้าในตระกร้ามีสินค้าอยู่แล้ว
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

//เอาไว้ใช้ตอนโชว์สินค้าของลูกค้าแต่ละคน
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

//เอาไว้ใช้อัพเดทปริมาณสินค้าในตระกร้า
export const updateCartQuantity = async(cartId,newQuantity)=>{
    const {rows} = await query(`
        UPDATE cart SET quantity = $1 WHERE cart_id = $2 RETURNING*
        `,[newQuantity,cartId])
    return rows || null
}


//C R U D 

//Admin use

//ผู้ใช้ลบสินค้าในตระกร้า
export const removeCart = async(cartId)=>{
    const {rowCount} = await query("DELETE FROM cart WHERE cart_id = $1",[cartId])
    return rowCount > 0
}
