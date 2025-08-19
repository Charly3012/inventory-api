export interface ProductGetResponse {
    id: number;
    name: string;
    SKU: string;
    quantity: number;
    price: number;
    description?: string | null;
    categoryId: number;
    createdAt: Date;
}