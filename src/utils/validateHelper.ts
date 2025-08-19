import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { handleHttp } from "./error.handle";

const validateResult = (req: Request, res: Response, next: Function) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        return handleHttp(res, 'VALIDATION_ERROR', error, 403);
    }
}

export { validateResult };
