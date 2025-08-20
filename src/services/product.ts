import { Product } from "../models/product";
import { anyCategoryExists } from "./category";
import { PaginatedResult } from "../models/DTO/utils/PaginatedResult";
import { ProductCreateRequest } from "../models/DTO/product/productCreateRequest";
import { ProductCreateResponse } from "../models/DTO/product/productCreateResponse";
import { ProductGetResponse } from "../models/DTO/product/productGetReponse";

const getProductsPaginated = async (page: number, limit: number): Promise<PaginatedResult<ProductGetResponse>> => {
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
        limit,
        offset,
        order: [["name", "ASC"]],
        where: { isActive: true }
    });

    const items: ProductGetResponse[] = rows.map(product => ({
        id: product.id,
        name: product.name,
        SKU: product.SKU,
        quantity: product.quantity,
        price: product.price,
        description: product.description ?? null,
        imgUrl: product.imgUrl ?? null,
        categoryId: product.categoryId,
        createdAt: product.createdAt
    }));

    return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        items
    };
}

const getProductById = async (id: number): Promise<ProductGetResponse | null> => {
    const product = await Product.findOne({ where: { id, isActive: true } });
    if (!product) return null;

    return {
        id: product.id,
        name: product.name,
        SKU: product.SKU,
        quantity: product.quantity,
        price: product.price,
        description: product.description ?? null,
        categoryId: product.categoryId,
        imgUrl: product.imgUrl ?? null,
        createdAt: product.createdAt
    };
}

const createProduct = async (data: ProductCreateRequest): Promise<ProductCreateResponse | null> => {
    if (!await anyCategoryExists(data.categoryId)) {
        throw new Error("CATEGORY_NOT_FOUND");
    }

    const product = await Product.create({
        SKU: data.SKU,
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        description: data.description ?? null,
        categoryId: data.categoryId,
        imgUrl: data.imgUrl ?? null
    });
    if (!product) return null;

    return {
        id: product.id,
        name: product.name,
        SKU: product.SKU,
        quantity: product.quantity,
        price: product.price,
        description: product.description ?? null,
        categoryId: product.categoryId,
        imgUrl: product.imgUrl ?? null,
        createdAt: product.createdAt!,
        updatedAt: product.updatedAt!,
    };
}

const updateProduct = async (id: number, data: Partial<ProductCreateRequest>): Promise<ProductCreateResponse> => {
    const product = await Product.findOne({ where: { id, isActive: true } });
    if (!product) throw new Error("PRODUCT_NOT_FOUND"); 

    if(data.categoryId && data.categoryId !== product.categoryId) {
        if (!await anyCategoryExists(data.categoryId)) {
            throw new Error("CATEGORY_NOT_FOUND");
        }
    }

    if(data.quantity && data.quantity < 0) {
        throw new Error("QUANTITY_CANNOT_BE_NEGATIVE");
    }

    if(data.price && data.price < 0) {
        throw new Error("PRICE_CANNOT_BE_NEGATIVE");
    }
    
    if (data.SKU && data.SKU !== product.SKU) {
        const existing = await Product.findOne({
        where: { name: data.SKU, isActive: true }
        });
        if (existing) throw new Error("SKU_CODE_ALREADY_EXISTS");
    }

    await product.update(data);

    return {
        id: product.id,
        name: data.name ?? product.name,
        SKU: data.SKU ?? product.SKU,
        quantity: data.quantity ?? product.quantity,
        price: data.price ?? product.price,
        description: data.description ?? product.description,
        categoryId: data.categoryId ?? product.categoryId,
        imgUrl: product.imgUrl ?? null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    };
}

const removeProduct = async (id: number): Promise<boolean> => {
    const product = await Product.findOne({ where: { id, isActive: true } });
    if (!product) throw new Error("PRODUCT_NOT_FOUND");

    await product.update({ isActive: false });
    return true;
}

const getActiveProductsToCategory = async (categoryId: number): Promise<number> => {
    return await Product.count({where: {categoryId, isActive: true}});
}

export { getActiveProductsToCategory, getProductsPaginated, getProductById, createProduct, updateProduct, removeProduct };