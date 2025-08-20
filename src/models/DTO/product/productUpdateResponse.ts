export interface ProductUpdateResponse {
    id: number;
    SKU: string;
    name: string;
    quantity: number;
    price: number;
    description?: string | null;
    categoryId: number;
    imgUrl?: string | null; 
    createdAt: Date;
    updatedAt: Date;
}