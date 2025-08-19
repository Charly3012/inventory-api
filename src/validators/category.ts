import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validateResult } from "../utils/validateHelper";

const validateCreate = [
    check('name')
    .notEmpty()
    .withMessage('Name is required'),

    check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];

export { validateCreate };