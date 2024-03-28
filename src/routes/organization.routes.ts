import express from "express";
import { OrganizationController } from "../controllers/organization.controller";
import { formatValidationErrors } from "../middlewares/formValidator.middleware";
import { OrganizationValidation } from "../validations/organization.validation";

const router = express.Router();

//create organization
router.post(
  "/",
  OrganizationValidation.create,
  formatValidationErrors,
  OrganizationController.create
);

//get organization by id
router.get(
  "/:id",
  OrganizationValidation.getById,
  formatValidationErrors,
  OrganizationController.getById
);

//get all organization
router.get(
  "/",
  OrganizationValidation.getAll,
  formatValidationErrors,
  OrganizationController.getAll
);

//update organization by id
router.patch(
  "/:id",
  OrganizationValidation.update,
  formatValidationErrors,
  OrganizationController.update
);

//delete organization by id
router.delete(
  "/:id",
  OrganizationValidation.deleteOrg,
  formatValidationErrors,
  OrganizationController.delete
);

export default router;
