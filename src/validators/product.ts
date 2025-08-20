import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validateResult } from "../utils/validateHelper";
import { CategoryEnum } from "../models/ENUMS/CategoryEnum";

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

    check('categoryEnum')
    .isString()
    .withMessage('Category enum field must be string')
    .isIn([...Object.values(CategoryEnum)])
    .withMessage('Category invalid'),

    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];

export { validateCreate };