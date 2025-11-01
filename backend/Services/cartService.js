import { query } from "../Config/database.js";

//เอาไว้ใช้เช็คว่า user มีตระกร้าอยู่่แล้วรึป่าว
export const checkCart = async (email) => {
  const { rows } = await query(
    "SELECT * FROM cart WHERE customer_email = $1 AND status != true",
    [email]
  );

  return rows[0] || null;
};

//เอาไว้เพิ่มข้อมูลลงในตระกร้าของuser แต่ละคน และมีการเพิ่ม ปริมาณสินค้าถ้าในตระกร้ามีสินค้าอยู่แล้ว
export const addCart = async (cartData) => {
  const { customer_email, variant_id, quantity, price } = cartData;

  const findExist = await query(
    `
        SELECT * FROM cart 
        WHERE customer_email=$1 AND variant_id=$2 AND status=FALSE 
        `,
    [customer_email, variant_id]
  );

  const { rows: existItems } = findExist;
  const existItem = existItems[0];

  if (existItem) {
    const newQuantity = existItem.quantity + quantity;
    const { rows } = await query(
      `
            UPDATE cart
            SET quantity=$1
            WHERE cart_id=$2
            RETURNING*
            `,
      [newQuantity, existItem.cart_id]
    );
    return rows[0];
  } else {
    const { rows } = await query(
      `
            INSERT INTO cart(customer_email,variant_id,quantity,price)
            VALUES($1,$2,$3,$4) RETURNING*
            `,
      [customer_email, variant_id, quantity, price]
    );
    return rows[0];
  }
};

//เอาไว้ใช้ตอนโชว์สินค้าของลูกค้าแต่ละคน
export const getCart = async (customerEmail) => {
  const { rows } = await query(
    `
        SELECT c.cart_id,c.quantity, c.price,p.product_id,p.name,p.description,p.image_filename,p.name,v.size
        FROM cart c
        JOIN product_variants v ON c.variant_id = v.variant_id
        JOIN products p ON v.product_id = p.product_id
        WHERE c.customer_email = $1 AND c.status = FALSE
        `,
    [customerEmail]
  );
  return rows;
};

//เอาไว้โชว์สรุปข้อมูลการสั่งซื้อสินค้าของลูกค้า
export const getCartOrder = async (customerEmail) => {
  const { rows } = await query(
    `
        SELECT c.cart_id,c.quantity,p.product_id,p.name,p.description,p.price,
        p.image_filename,v.size,o.order_id,o.total_price,o.payment_method,a.house_number,
        a.village_number,a.subdistrict,a.district,a.province,a.postal_code  
        FROM cart c
        JOIN product_variants v ON c.variant_id = v.variant_id
        JOIN products p ON v.product_id = p.product_id
        JOIN orders o ON c.order_id = o.order_id
        JOIN address a ON o.address_id = a.address_id
        WHERE c.customer_email = $1 AND c.status = true
        `,
    [customerEmail]
  );

  return rows;
};
//เอาไว้ใช้อัพเดทปริมาณสินค้าในตระกร้า
export const updateCartQuantity = async (cartId, newQuantity) => {
  // ดึงข้อมูลสินค้าและ variant ของ cart
  const { rows: cartRows } = await query(
    `SELECT c.cart_id, c.variant_id, c.quantity, v.stock_quantity
     FROM cart c
     JOIN product_variants v ON c.variant_id = v.variant_id
     WHERE c.cart_id = $1`,
    [cartId]
  );

  const cartItem = cartRows[0];
  if (!cartItem) return null;

  // เช็ค stock
  if (newQuantity > cartItem.stock_quantity) {
    return {
      success: false,
      message: `มีสินค้าใน stock เพียง ${cartItem.stock_quantity} ชิ้นเท่านั้น`,
    };
  }

  // อัปเดตจำนวนใน cart
  const { rows } = await query(
    `UPDATE cart SET quantity = $1 WHERE cart_id = $2 RETURNING*`,
    [newQuantity, cartId]
  );

  return { success: true, updatedCart: rows[0] };
};

//เอาไว้อัพเดต Status ของตะกร้า เมื่อผู้ใช้กดซื้อและชำระเงินสำเร็จ แล้วเพิ่มข้อมูลลงtable orders
//เอาไว้อัพเดต Status ของตะกร้า เมื่อผู้ใช้กดซื้อและชำระเงินสำเร็จ แล้วเพิ่มข้อมูลลงtable orders
export const confirmCart = async (customerEmail, addressId, paymentMethod) => {
  await query("BEGIN");

  try {
    const cartRes = await query(
      `SELECT c.*, v.product_id 
       FROM cart c
       JOIN product_variants v ON c.variant_id = v.variant_id
       WHERE c.customer_email = $1 AND c.status = false`,
      [customerEmail]
    );

    if (cartRes.rows.length === 0) {
      await query("ROLLBACK");
      return null;
    }

    const totalPrice = cartRes.rows.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderRes = await query(
      `INSERT INTO orders(customer_email,total_price,status,address_id,payment_method)
           VALUES($1,$2,true,$3,$4) RETURNING*
          `,
      [customerEmail, totalPrice, addressId, paymentMethod]
    );
    const orderId = orderRes.rows[0].order_id;

    await query(
      `UPDATE cart SET status=true ,order_id=$1 
           WHERE customer_email=$2 AND status=false`,
      [orderId, customerEmail]
    );

    // --- [!] จุดแก้ไขสำคัญอยู่ตรงนี้ ---
    for (let item of cartRes.rows) {
      
      // 1. ลองอัปเดตสต็อก โดยมีเงื่อนไขว่าสต็อกต้องพอ
      const updateRes = await query(
        `
          UPDATE product_variants
          SET stock_quantity = stock_quantity - $1
          WHERE variant_id = $2 AND stock_quantity >= $1
        `,
        // [!] $1 = item.quantity, $2 = item.variant_id
        [item.quantity, item.variant_id] 
      );

      // 2. เช็คว่าการอัปเดตสำเร็จหรือไม่
      if (updateRes.rowCount === 0) {
        // ถ้า rowCount เป็น 0 แปลว่า WHERE ไม่สำเร็จ (สต็อกไม่พอ)
        // เราจะโยน Error เพื่อบังคับให้ Transaction Rollback
        throw new Error(
          `สินค้า (Variant ID: ${item.variant_id}) มีสต็อกไม่เพียงพอ`
        );
      }
      
      // 3. ถ้าอัปเดต variant สำเร็จ ค่อยอัปเดตสต็อกรวมใน products
      // (โค้ดส่วนนี้ของคุณถูกต้องแล้ว)
      await query(
        `UPDATE products
         SET stock_quantity = (
           SELECT SUM(stock_quantity)
           FROM product_variants
           WHERE product_id=$1
         )
         WHERE product_id=$1`,
        [item.product_id]
      );
    }
    // --- สิ้นสุดจุดแก้ไข ---

    await query("COMMIT");
    return orderRes.rows[0];
  } catch (err) {
    await query("ROLLBACK");
    console.log("Transaction Rolled Back:", err.message); // แสดง Error ที่เราโยน
    throw err; // โยน Error ต่อไปให้ Controller (ถ้าจำเป็น)
  }
};

//C R U D

//Admin use

export const createCart = async (cartData) => {
  const { customer_email, variant_id, quantity, price } = cartData;
  const { rows } = await query(
    `
        INSERT INTO cart(customer_email,variant_id,quantity,price) 
        VALUES($1,$2,$3,$4)
        RETURNING*
        `,
    [customer_email, variant_id, quantity, price]
  );
  return rows[0];
};

export const getAllCart = async () => {
  const { rows } = await query(`
        SELECT * FROM cart
        `);
  return rows;
};

export const updateCart = async (cartId, cartData) => {
  const { customer_email, variant_id, quantity, price, status } = cartData;
  const { rows } = await query(
    `
        UPDATE cart SET customer_email=$1,variant_id=$2,quantity=$3,price=$4,status=$5
        WHERE cart_id=$6 RETURNING*
        `,
    [customer_email, variant_id, quantity, price, status, cartId]
  );
  return rows[0];
};

//ผู้ใช้ลบสินค้าในตระกร้า
export const removeCart = async (cartId) => {
  const { rowCount } = await query("DELETE FROM cart WHERE cart_id = $1", [
    cartId,
  ]);
  return rowCount > 0;
};
