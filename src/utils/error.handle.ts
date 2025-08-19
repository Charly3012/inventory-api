import { Response } from "express";
import { ValidationError, UniqueConstraintError, ValidationErrorItem } from "sequelize";

const ENVIRONMENT = process.env.NODE_ENV || 'development';

const handleHttp = (res: Response, error: string, errorRaw: any, code?: number) => {
    let details: any = null;
    code = code || 500; 

    if (errorRaw instanceof UniqueConstraintError) {
        details = errorRaw.errors.map(e => ({
        field: e.path,
        message: e.message
        }));
    } else if (errorRaw instanceof ValidationError) {
        details = errorRaw.errors.map(e => ({
        field: e.path,
        message: e.message
        }));
    } else if (errorRaw instanceof ValidationErrorItem) {
        details = errorRaw.message;

    } else if (ENVIRONMENT !== "development" && (code >= 500 && code <= 599)) {
        details = 'Unexpected error occurred';
    }else {
        details = errorRaw;
    }

    res.status(code).json({ error, details });
};


export { handleHttp };