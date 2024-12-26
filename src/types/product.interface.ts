

export type TProduct = {
    _id?: string;
    name: string;
    price: number;
    category: string;
    image?: string;
    inventoryCount: number;
    discount?: number;
    shopId: string;
    reviews?: string[];
};
