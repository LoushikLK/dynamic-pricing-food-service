import { ItemType } from "@prisma/client";
import { body, param, query, ValidationChain } from "express-validator";

const create: ValidationChain[] = [
  body("organizationId")
    .notEmpty()
    .withMessage("organizationId is required")
    .isNumeric()
    .withMessage("organizationId must be numeric"),
  body("itemId")
    .notEmpty()
    .withMessage("itemId is required")
    .isNumeric()
    .withMessage("itemId must be numeric"),
  body("baseDistanceInKM")
    .notEmpty()
    .withMessage("baseDistanceInKM is required")
    .isNumeric()
    .withMessage("baseDistanceInKM must be numeric"),
  body("pricePerKM")
    .notEmpty()
    .withMessage("pricePerKM is required")
    .isNumeric()
    .withMessage("pricePerKM must be numeric"),
  body("fixPrice")
    .notEmpty()
    .withMessage("fixPrice is required")
    .isNumeric()
    .withMessage("fixPrice must be numeric"),
  body("zone")
    .notEmpty()
    .withMessage("zone is required")
    .isString()
    .withMessage("zone must be string"),
];
const update: ValidationChain[] = [
  body("organizationId")
    .optional()
    .isNumeric()
    .withMessage("organizationId must be numeric"),
  body("itemId").optional().isNumeric().withMessage("itemId must be numeric"),
  body("baseDistanceInKM")
    .optional()
    .isNumeric()
    .withMessage("baseDistanceInKM must be numeric"),
  body("pricePerKM")
    .optional()
    .isNumeric()
    .withMessage("pricePerKM must be numeric"),
  body("fixPrice")
    .optional()
    .isNumeric()
    .withMessage("fixPrice must be numeric"),
  body("zone").optional().isString().withMessage("zone must be string"),
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be numeric"),
];
const deleteOrg: ValidationChain[] = [
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
  query("search").optional().isString().withMessage("search must be string"),
  query("sortBy").optional().isString().withMessage("sortBy must be string"),
  query("itemId").optional().isNumeric().withMessage("itemId must be number"),
  query("organizationId")
    .optional()
    .isNumeric()
    .withMessage("organizationId must be number"),
  query("itemType")
    .optional()
    .isString()
    .withMessage("itemType must be string")
    .isIn(Object.values(ItemType))
    .withMessage(
      "itemType must be one of these values: " + Object.values(ItemType)
    ),
];

export const PricingValidation = {
  create,
  update,
  deleteOrg,
  getById,
  getAll,
};
