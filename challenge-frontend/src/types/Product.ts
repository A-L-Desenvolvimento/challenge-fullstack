export type CreateProductProps = {
    name: string;
    description: string;
    price: number;
    quantity: number;

}

export type Product = CreateProductProps & {
    id: number;
    active?: boolean;
}

export type ProductList = {
    data: Product[];
    last_page: number;
}

