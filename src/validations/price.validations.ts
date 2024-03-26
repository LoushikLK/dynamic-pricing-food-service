import { body, ValidationChain } from "express-validator";

export const checkPriceValidations: ValidationChain[] = [
  body("zone")
    .notEmpty()
    .withMessage("Zone is required")
    .isString()
    .withMessage("Zone must be string"),
];
