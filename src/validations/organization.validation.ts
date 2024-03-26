import { body, param, query, ValidationChain } from "express-validator";

const create: ValidationChain[] = [
  body("name").notEmpty().withMessage("name is required"),
];
const update: ValidationChain[] = [
  body("name").notEmpty().withMessage("name is required"),
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
  query("search").optional().isString().withMessage("search must be numeric"),
  query("sortBy").optional().isString().withMessage("sortBy must be numeric"),
];

export const OrganizationValidation = {
  create,
  update,
  deleteOrg,
  getById,
  getAll,
};
