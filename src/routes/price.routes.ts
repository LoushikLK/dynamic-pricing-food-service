import express from "express";
import { PricingController } from "../controllers/pricing.controllers";
import { formatValidationErrors } from "../middlewares/formValidator.middleware";
import { PricingValidation } from "../validations/price.validations";

const router = express.Router();

//create pricing
router.post(
  "/",
  PricingValidation.create,
  formatValidationErrors,
  PricingController.create
);

//get pricing by id
router.get(
  "/:id",
  PricingValidation.getById,
  formatValidationErrors,
  PricingController.getById
);

//get all pricing
router.get(
  "/",
  PricingValidation.getAll,
  formatValidationErrors,
  PricingController.getAll
);

//update pricing by id
router.patch(
  "/:id",
  PricingValidation.update,
  formatValidationErrors,
  PricingController.update
);

//delete pricing by id
router.delete(
  "/:id",
  PricingValidation.deleteOrg,
  formatValidationErrors,
  PricingController.delete
);
//get dynamic pricing
router.post(
  "/pricing",
  PricingValidation.dynamicPricing,
  formatValidationErrors,
  PricingController.dynamicPricing
);

export default router;
