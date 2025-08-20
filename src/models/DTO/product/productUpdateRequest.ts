import { CategoryEnum } from "../../ENUMS/CategoryEnum";

export interface ProductUpdateRequest {
    SKU: string;
    name: string;
    quantity: number;
    price: number;
    description?: string | null;
    categoryId: number;
    categoryEnum: CategoryEnum;
    imgUrl?: string | null; 
}