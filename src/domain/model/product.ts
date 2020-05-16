import { Factory } from "./factory";

export class Product {
    amount!: number;
    id!: number;
    name!: string;
    price!: number;
    factory!: Factory;
    willDelete!: boolean;
}