import {api} from '@/services/api'
import {CreateProductProps, Product, ProductList} from "@/types/Product";

export const productsService = {
    listAll: async (page: number) => {
        const products = await api.get('/products?page=' + page);
        return products.data as ProductList
    },

    getProduct: async (id: number) => {
        const product = await api.get('/products/' + id);
        return product.data
    },

    createProduct: async (product: CreateProductProps) => {
        const response = await api.post('/products', product);
        return response.data as Product
    },

    updateProduct: async (product: Product) => {
        const response = await api.put('/products/' + product.id, product);
        return response.data as Product
    },

    deleteProduct: async (id: number) => {
        const response = await api.delete('/products/' + id);
        return response.data
    }


}
