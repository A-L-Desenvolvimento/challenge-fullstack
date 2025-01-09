'use client'

import React, { useState} from "react";
import {useParams} from "next/navigation";
import {formatarValorMonetario} from "@/utils/formatarValorMonetario";
import {productsService} from "@/services/productsService";
import {notifyCustom} from "@/utils/Notify";
import {Product} from "@/types/Product";
import FormProduct from "@/app/produtos/FormProduct";

const Products = () => {

    const params = useParams<{ id: string }>()
    console.log(params)

    const [product, setProduct] = useState<Product>();
    const [status, setStatus] = useState(false);

    const onSubmit = async (data: Product) => {
        const payload = {
            ...data,
            active: status,
            price: formatarValorMonetario(data?.price)
        }

        try {
            const response = await productsService.createProduct(payload);

            if (response) {
                setProduct(response)
                notifyCustom("Produto criado com sucesso", "success")
            }
        } catch {
            notifyCustom("Erro ao tentar criar o produto", "error")
        }
    }


    return (
        <FormProduct product={product} setProduct={setProduct} onSubmit={onSubmit} status={status} setStatus={setStatus} />
    );

}

export default Products