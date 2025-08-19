export interface ProductUpdateResponse {
    id: number;
    SKU: string;
    name: string;
    quantity: number;
    price: number;
    description?: string | null;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}