'use server'

import {productsService} from "@/services/productsService";

export async function getProducts(page = 1) {
    return await productsService.listAll(page);
}
