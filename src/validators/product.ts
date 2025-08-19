import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validateResult } from "../utils/validateHelper";

const validateCreate = [
    check('name')
    .notEmpty()
    .withMessage('Name is required'),

    check('SKU')
    .notEmpty()
    .withMessage('SKU is required'),

    check('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a positive integer'),

    check('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),

    check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

    check('categoryId')
    .isInt({ gt: 0 })
    .withMessage('Category ID must be a positive integer'),

    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];

export { validateCreate };