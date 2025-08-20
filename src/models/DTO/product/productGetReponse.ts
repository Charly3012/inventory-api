import { CategoryEnum } from "../../ENUMS/CategoryEnum";

export interface ProductGetResponse {
    id: number;
    name: string;
    SKU: string;
    quantity: number;
    price: number;
    description?: string | null;
    categoryId: number;
    imgUrl?: string | null; 
    categoryEnum: CategoryEnum;
    createdAt: Date;
}