import { Category } from "../models/category";
import { CategoryCreateRequest } from "../models/DTO/category/categoryCreateRequest";
import { CategoryCreateResponse } from "../models/DTO/category/categoryCreateResponse";
import { CategoryGetResponse } from "../models/DTO/category/categoryGetResponse";
import { PaginatedResult } from "../models/DTO/utils/PaginatedResult";
import { CategoryUpdateRequest } from "../models/DTO/category/categoryUpdateRequest";
import { CategoryUpdateResponse } from "../models/DTO/category/categoryUpdateResponse";
import { getActiveProductsToCategory } from "./product";

const getCategoriesPaginated = async (page: number, limit: number): Promise<PaginatedResult<CategoryGetResponse>> => {
    const offset = (page - 1) * limit;

    const { count, rows } = await Category.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        where: { isActive: true }
    });

    const items: CategoryGetResponse[] = rows.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description ?? null,
        createdAt: category.createdAt,
    }));

    return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        items
    };
}

const getCategoryById = async (id: number): Promise<CategoryGetResponse | null> => {
    const category = await Category.findOne({where: {id, isActive: true}});
    if (!category) return null;
    
    return {
        id: category.id,
        name: category.name,
        description: category.description ?? null,
        createdAt: category.createdAt,
    };
}

const createCategory = async (data: CategoryCreateRequest): Promise<CategoryCreateResponse> => {
    const category = await Category.create({
        name: data.name,
        description: data.description ?? null,
    });

    return {
        id: category.id,
        name: category.name,
        description: category.description ?? null,
        createdAt: category.createdAt!,
        updatedAt: category.updatedAt!,
    };
}

const updateCategory = async (id: number, data: Partial<CategoryUpdateRequest>): Promise<CategoryUpdateResponse> => {
    const category = await Category.findOne({ where: { id, isActive: true } });
    if (!category) throw new Error("CATEGORY_NOT_FOUND");

    if (data.name && data.name !== category.name) {
        const existing = await Category.findOne({
        where: { name: data.name, isActive: true }
        });
        if (existing) throw new Error("CATEGORY_NAME_ALREADY_EXISTS");
    }

    await category.update(data);

    return {
        id: category.id,
        name: data.name ?? category.name,
        description: data.description ?? category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
    };
}

const removeCategory = async (id: number): Promise<boolean> => {
    const category = await Category.findOne({where: {id, isActive: true}});
    if (!category) throw new Error("CATEGORY_NOT_FOUND");
    
    const productsCount = await getActiveProductsToCategory(id);
    if( productsCount > 0) throw new Error("CATEGORY_WITH_PRODUCTS");

    await category.update({ isActive: false });
    return true;
}

const anyCategoryExists = async (id: number): Promise<boolean> => {
    const category = await Category.findOne({
        where: { id, isActive: true }
    });
    return !!category;
}

export { createCategory, getCategoriesPaginated, getCategoryById, updateCategory, removeCategory, anyCategoryExists };