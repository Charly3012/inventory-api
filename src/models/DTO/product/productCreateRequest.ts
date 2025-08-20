import { CategoryEnum } from "../../ENUMS/CategoryEnum";

export interface ProductCreateRequest {
    name: string
    SKU: string;
    quantity: number;
    price: number;
    description?: string | null;
    categoryId: number;
    imgUrl?: string | null; 
    categoryEnum: CategoryEnum;
}