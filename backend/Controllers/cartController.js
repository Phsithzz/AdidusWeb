import * as cartService from "../Services/cartService.js";
import { query } from "../Config/database.js";

//เอาไว้ใช้เช็คว่า user มีตระกร้าอยู่่แล้วรึป่าว
export const checkCart = async (req, res) => {
  console.log("POST /cart/checkcart is request");
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({
        error: true,
        errormessage: "User Email is required",
      });
    }

    const newcart = await cartService.checkCart(email);
    if (newcart != null) {
      return res.json({
        cartExist: true,
        cart_id: newcart.cart_id,
      });
    } else {
      return res.json({
        cartExist: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error checkCart",
      error: err.message,
    });
  }
};

//เอาไว้เพิ่มข้อมูลลงในตระกร้าของuser แต่ละคน และมีการเพิ่ม ปริมาณสินค้าถ้าในตระกร้ามีสินค้าอยู่แล้ว
export const addCart = async (req, res) => {
  console.log("POST /cart/addcart is request");
  try {
    const cartData = req.body;
    if (cartData.customer_email == null) {
      return res.json({
        cartOK: false,
        messageAddCart: "Customer Email is required",
      });
    }
    const newcart = await cartService.addCart(cartData);
    res.json({ cartOK: true, messageAddCart: newcart });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error addCart",
      error: err.message,
      cartOK: false,
    });
  }
};

//เอาไว้ใช้ตอนโชว์สินค้าของลูกค้าแต่ละคน
export const getCart = async (req, res) => {
  console.log("GET /cart/:customerEmail");
  try {
    const { customerEmail } = req.params;
    const cart = await cartService.getCart(customerEmail);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error getCart",
      error: err.message,
    });
  }
};

//เอาไว้โชว์สรุปข้อมูลการสั่งซื้อสินค้าของลูกค้า
export const getCartOrder = async (req, res) => {
  console.log("GET /cart/order/:customerEmail");
  try {
    const { customerEmail } = req.params;
    const cart = await cartService.getCartOrder(customerEmail);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server erorr getCartOrder",
    });
  }
};
//เอาไว้ใช้อัพเดทปริมาณสินค้าในตระกร้า
export const updateCartQuantity = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { newQuantity } = req.body;

    if (newQuantity == null || newQuantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const result = await cartService.updateCartQuantity(cartId, newQuantity);

    if (!result) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(200).json(result.updatedCart);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error updateCartQuantity",
      error: err.message,
    });
  }
};

//เอาไว้ออัพเดต Status ของตะกร้า เมื่อผู้ใช้กดซื้อและชำระเงินสำเร็จ แล้วเพิ่มข้อมูลลงtable orders
export const confirmCart = async (req, res) => {
  console.log("PUT /cart/confirm/:customerEmail is request");
  try {
    const { customerEmail } = req.params;
    const { address, payment_method } = req.body;
    const {
      house_number,
      village_number,
      subdistrict,
      district,
      province,
      postal_code,
    } = address;

    const addressRes = await query(
      `INSERT INTO address(house_number,village_number,subdistrict,district,province,postal_code)
            VALUES($1,$2,$3,$4,$5,$6) 
            RETURNING address_id`,
      [
        house_number,
        village_number,
        subdistrict,
        district,
        province,
        postal_code,
      ]
    );
    const addressId = addressRes.rows[0].address_id;

    const order = await cartService.confirmCart(
      customerEmail,
      addressId,
      payment_method
    );

    if (!order) return res.status(400).json({ message: "No item to confirm" });

    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error confirmCart",
      error: err.message,
    });
  }
};
//C R U D

//Admin use

export const getAllCart = async (req, res) => {
  console.log("GET /cart/admin is requst");
  try {
    const cart = await cartService.getAllCart();
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error getAllUser",
      error: err.message,
    });
  }
};
export const createCart = async (req, res) => {
  console.log("POST /cart/admin is request");
  try {
    const cartData = req.body;
    const newcart = await cartService.createCart(cartData);
    res.status(201).json(newcart);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error createCart",
      error: err.message,
    });
  }
};

export const updateCart = async (req, res) => {
  console.log("PUT /cart/admin/:cartId is request");
  try {
    const { cartId } = req.params;
    const cartData = req.body;
    const updateCart = await cartService.updateCart(cartId, cartData);
    if (!updateCart) {
      return res.status(400).json({ message: "Cart not found" });
    }
    res.status(200).json(updateCart);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error updateCart",
      error: err.message,
    });
  }
};
export const removeCart = async (req, res) => {
  console.log("DELETE /cart/admin/:cartId");
  try {
    const { cartId } = req.params;
    const deleted = await cartService.removeCart(cartId);
    if (!deleted) {
      return res.status(404).json({ message: "Cart not Found" });
    }
    res.status(200).json({ message: "Cart deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error removeCart",
      error: err.message,
    });
  }
};

//Admin use
