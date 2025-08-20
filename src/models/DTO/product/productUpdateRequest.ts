export interface ProductUpdateRequest {
    SKU: string;
    name: string;
    quantity: number;
    price: number;
    description?: string | null;
    categoryId: number;
    imgUrl?: string | null; }