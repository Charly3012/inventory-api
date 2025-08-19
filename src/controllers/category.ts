import { Request, response, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { createCategory, getCategoriesPaginated, getCategoryById, updateCategory, removeCategory } from "../services/category";

const getAll = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const data = await getCategoriesPaginated(page, limit);
        res.status(200).send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_CATEGORIES', e);
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

        const data = await getCategoryById(parsedId);
        if (!data) {
            handleHttp(res, 'CATEGORY_NOT_FOUND', `Category with id ${parsedId} not found`, 404); 
            return;
        }

        res.status(200).send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_CATEGORIES', e);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const response = await createCategory(req.body);
        if (!response) {
            handleHttp(res, 'ERROR_CREATE_CATEGORY', 'Failed to create category', 400);
            return;
        }
        res.status(201).send({ response });
    } catch (e) {
        handleHttp(res, 'ERROR_CREATE_CATEGORY', e);
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
        const response = await updateCategory(parsedId, data);
        res.status(200).send({ response });
    } catch (e: any) {
        if (e.message === "CATEGORY_NOT_FOUND") {
            return handleHttp(res, "CATEGORY_NOT_FOUND", "Category not found", 404);
        }
        if (e.message === "CATEGORY_NAME_ALREADY_EXISTS") {
            return handleHttp(res, "VALIDATION_ERROR", "Category name already exists", 400);
        }
        handleHttp(res, 'ERROR_CREATE_CATEGORY', e);
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

        await removeCategory(parsedId);
        res.send(204);
    } catch (e: any) {
        if (e.message === "CATEGORY_NOT_FOUND") {
            return handleHttp(res, "CATEGORY_NOT_FOUND", "Category not found", 404);
        }
        if (e.message === "CATEGORY_WITH_PRODUCTS") {
            return handleHttp(res, "VALIDATION_ERROR", "Category with associated products ", 400);
        }
        handleHttp(res, 'ERROR_CREATE_CATEGORY', e);
    }
}

export { getAll, getById, create, update, remove };