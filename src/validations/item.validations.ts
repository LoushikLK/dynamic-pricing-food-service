import { ItemType } from "@prisma/client";
import { body, param, query, ValidationChain } from "express-validator";

const create: ValidationChain[] = [
  body("type").notEmpty().withMessage("type is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("description must be string"),
];
const update: ValidationChain[] = [
  body("type").notEmpty().withMessage("type is required"),
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be numeric"),
  body("description")
    .optional()
    .isString()
    .withMessage("description must be string"),
];
const deleteItem: ValidationChain[] = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be numeric"),
];

const getById: ValidationChain[] = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be numeric"),
];
const getAll: ValidationChain[] = [
  query("perPage")
    .optional()
    .isNumeric()
    .withMessage("perPage must be numeric"),
  query("pageNo").optional().isNumeric().withMessage("pageNo must be numeric"),
  query("type")
    .optional()
    .isString()
    .withMessage("type must be string")
    .isIn(Object.values(ItemType))
    .withMessage(
      "type must be one of these values: " + Object.values(ItemType)
    ),
  query("sortBy").optional().isString().withMessage("sortBy must be string"),
];

export const ItemValidation = {
  create,
  update,
  deleteItem,
  getById,
  getAll,
};
