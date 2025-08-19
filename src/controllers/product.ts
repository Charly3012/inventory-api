import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { createProduct, getProductsPaginated, getProductById, updateProduct, removeProduct } from "../services/product";

const getAll = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const data = await getProductsPaginated(page, limit);
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_PRODUCTS', e);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            handleHttp(res, 'INVALID_ID', 'ID parameter is required', 400);
            return;
        }

        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            handleHttp(res, 'INVALID_ID', 'ID must be a number', 400);
            return;
        }

        const data = await getProductById(parsedId);
        if (!data) {
            handleHttp(res, 'PRODUCT_NOT_FOUND', `Product with id ${parsedId} not found`, 404); 
            return;
        }
        res.status(200).send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_PRODUCTS', e);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const response = await createProduct(req.body);
        if (!response) {
            handleHttp(res, 'ERROR_CREATE_PRODUCT', 'Failed to create product', 400);
            return;
        }
        res.status(201).send({ response });
    } catch (e: any) {
        if (e.message === "CATEGORY_NOT_FOUND") {
            return handleHttp(res, e.message, "Category not found", 404);
        }
        handleHttp(res, 'ERROR_CREATE_PRODUCT', e);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
    
        if (!id) {
            handleHttp(res, 'INVALID_ID', 'ID parameter is required', 400);
            return;
        }
    
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            handleHttp(res, 'INVALID_ID', 'ID must be a number', 400);
            return;
        }

        const data = req.body;
        const response = await updateProduct(parsedId, data);
        res.status(200).send({ response });
    } catch (e: any) {
        if (e.message === "PRODUCT_NOT_FOUND") {
            return handleHttp(res, e.message, "Product not found", 404);
        }
        if (e.message === "CATEGORY_NOT_FOUND") {
            return handleHttp(res, e.message, "Category not found", 404);
        }
        if (e.message === "QUANTITY_CANNOT_BE_NEGATIVE" || e.message === "PRICE_CANNOT_BE_NEGATIVE") {
            return handleHttp(res, e.message, "Validation number error", 400);
        }
        if( e.message === "PRODUCT_SKU_ALREADY_EXISTS") {
            return handleHttp(res, e.message, "SKU code already exists", 400);
        }

        handleHttp(res, 'ERROR_UPDATE_PRODUCT', e);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
    
        if (!id) {
            handleHttp(res, 'INVALID_ID', 'ID parameter is required', 400);
            return;
        }
    
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            handleHttp(res, 'INVALID_ID', 'ID must be a number', 400);
            return;
        }
        
        await removeProduct(parsedId);
        res.status(204).send();
    } catch (e: any) {
        if (e.message === "PRODUCT_NOT_FOUND") {
            return handleHttp(res, e.message, "Product not found", 404);
        }
        handleHttp(res, 'ERROR_DELETE_PRODUCT', e);
    }
}

export { getAll, getById, create, update, remove }; 