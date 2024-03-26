import express from "express";
import { PriceController } from "../controllers/pricing.controllers";

const router = express.Router();

router.get("/check-price", PriceController.checkPrice);

export default router;
