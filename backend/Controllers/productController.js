import * as productService from "../Services/productService.js";

//C R U D

//Admin use
export const createProduct = async (req, res) => {
  console.log("POST /products is request")
  try {
    const productData = req.body;
    const newproduct = await productService.createProduct(productData);
    res.status(201).json(newproduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error createProduct",
      error: err.message,
    });
  }
};

export const getProduct = async (req, res) => {
  console.log("GET /products is request")
  try {
    const product = await productService.getProduct();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error getProduct",
      error: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  console.log("PUT /products/:productId is request")
  try {
    const {productId} = req.params;
    const productData = req.body;

    const updateProduct = await productService.updateProduct(
      productId,
      productData
    );

    if (!updateProduct) {
      return res.status(400).json({
        message: "Product not Found",
      });
    }
    res.status(200).json(updateProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error updateProduct",
      error: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  console.log("DELETE /products/:productid")
  try {
    const {productId} = req.params;
    const deleted = await productService.deleteProduct(productId);

    if (!deleted) {
      return res.status(404).json({
        message: "Product not Found",
      });
    }
    res.status(200).send("DELETED");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error deleteProduct",
      error: err.message,
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if(!searchTerm){
      return res.json([])
    }
    
    const product = await productService.searchProduc(searchTerm);
    
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error searchProduct",
      error: err.message,
    });
  }
};
//Admin use

//เอาไว้แสดงสินค้าหน้าตัวโชว์
export const getProductShow = async(req,res) =>{
  console.log("GET /products/show is request")
  try {
    const product = await productService.getProductShow()
    res.status(200).json(product)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message:"Server error getProductShow",
      error:err.message
    })
    
  }
}

//เอาไว้ใช้ตอนผู้ใช้กด เลือกBrand ตรงNavbar
export const getProductBrand = async(req,res)=>{
  console.log("/GET /products/brand/:brand is request")
  try {
    const {brand} = req.params
    const productBrand = await productService.getProductBrand(brand)
    res.status(200).json(productBrand)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message:"Server error getProductBrand"
    })
    
  }
}

//เอาไว้ใช้เมื่อผู้ให้กดเลือก View Detail และจะแสดงหน้าของสินค้านั้นๆ 1 ชิ้น
export const getProductId = async(req,res)=>{
  console.log("/product/:id is request")
  try {
    const productId = req.params.id
    const product = await productService.getProductId(productId)
    res.status(200).json(product)
  } catch (err) {
    console.log(err)  
    res.status(500).json({
      message:"Server error getProductId",
      error:err.message
    })
    
  }
}

//เอาไว้ใช้ตอนผู้ให้เลือกประเภทของรองเท้าตรง Navbar Product กับ category sidebar ด้านซ้าย
export const getProductType = async(req,res)=>{
  try {
    const {description} = req.params
    const des = await productService.getProductType(description)
    res.status(200).json(des)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message:"Server error getProductType"
    })
    
  }
}


