import { CategoryEnum } from "../../ENUMS/CategoryEnum";

export interface ProductUpdateResponse {
    id: number;
    SKU: string;
    name: string;
    quantity: number;
    price: number;
    description?: string | null;
    categoryId: number;
    imgUrl?: string | null; 
    categoryEnum: CategoryEnum;
    createdAt: Date;
    updatedAt: Date;
}