//import
import express from "express";

//env
import dotenv from "dotenv";

//middleware
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

//database
import database from "./Config/database.js";

//route
import productRoute from "./Routes/productRoute.js";
import variantRoute from "./Routes/variantRoute.js";
import userRoute from "./Routes/userRoute.js";
import cartRoute from "./Routes/cartRoute.js"
import orderRoute from "./Routes/orderRoute.js"

//swagger Yaml
import swaggerUI from "swagger-ui-express"
import yaml from "yaml"
//file
import fs from "fs"

//import

//use ENV
dotenv.config();

//
const app = express();

//app use middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/img_products",express.static("img_products"))
app.use("/img_users",express.static("img_users"))
app.use(bodyParser.json());
app.use(cookieParser());
//app use middleware

//

//route
app.use(productRoute);
app.use(variantRoute);
app.use(userRoute);
app.use(cartRoute)
app.use(orderRoute)
//route

//swager + yaml
const swaggerfile = fs.readFileSync("services/swagger.yaml","utf-8")
const swaggerDoc = yaml.parse(swaggerfile)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))


//run port server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is Runnig on Port ${port}`);
}); 
//run port server
