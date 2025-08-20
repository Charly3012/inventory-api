export interface ProductCreateResponse {
    id: number;
    name: string;
    SKU: string;
    quantity: number;
    price: number;
    description?: string | null;
    categoryId: number;
    imgUrl?: string | null;     createdAt: Date;
    updatedAt: Date;
}