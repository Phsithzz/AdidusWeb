import express from "express";
import * as variantController from "../Controllers/variantController.js";
//import

const router = express.Router();

router.post("/variant", variantController.createVariant);

router.get("/variant", variantController.getVariant);

router.put("/variant/:variantId", variantController.updateVariant);

router.delete("/variant/:variantId", variantController.deleteVariant);

export default router;
