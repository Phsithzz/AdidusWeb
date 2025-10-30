import {query} from "../Config/database.js"

//C R U D

//Admind

export const getOrder = async()=>{
    const {rows} = await query("SELECT * FROM orders")
    return rows
}

export const remove = async(orderId)=>{
    const {rowCount} = await query("DELETE FROM orders WHERE order_id=$1",[orderId])

    return rowCount>0
}
//Admind