import express from "express";
import { ItemController } from "../controllers/item.controllers";
import { formatValidationErrors } from "../middlewares/formValidator.middleware";
import { ItemValidation } from "../validations/item.validations";

const router = express.Router();

//create item
router.post(
  "/",
  ItemValidation.create,
  formatValidationErrors,
  ItemController.create
);

//get item by id
router.get(
  "/:id",
  ItemValidation.getById,
  formatValidationErrors,
  ItemController.getById
);

//get all item
router.get(
  "/",
  ItemValidation.getAll,
  formatValidationErrors,
  ItemController.getAll
);

//update item by id
router.patch(
  "/:id",
  ItemValidation.update,
  formatValidationErrors,
  ItemController.update
);

//delete item by id
router.delete(
  "/:id",
  ItemValidation.deleteItem,
  formatValidationErrors,
  ItemController.delete
);

export default router;
