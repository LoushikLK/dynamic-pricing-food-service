import express from "express";
import { PricingController } from "../controllers/pricing.controllers";
import { formatValidationErrors } from "../middlewares/formValidator.middleware";
import { PricingValidation } from "../validations/price.validations";

const router = express.Router();

//create organization
router.post(
  "/",
  PricingValidation.create,
  formatValidationErrors,
  PricingController.create
);

//get organization by id
router.get(
  "/:id",
  PricingValidation.getById,
  formatValidationErrors,
  PricingController.update
);

//get all organization
router.get(
  "/",
  PricingValidation.getAll,
  formatValidationErrors,
  PricingController.getAll
);

//update organization by id
router.patch(
  "/:id",
  PricingValidation.update,
  formatValidationErrors,
  PricingController.update
);

//delete organization by id
router.delete(
  "/:id",
  PricingValidation.deleteOrg,
  formatValidationErrors,
  PricingController.delete
);

export default router;
