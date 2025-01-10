'use client'
import {productsService} from '@/services/productsService'
import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {notifyCustom} from "@/utils/Notify";
import {Product} from "@/types/Product";
import FormProduct from "@/app/produtos/FormProduct";

const Products = () => {

    const params = useParams<{ id: string }>()

    const [product, setProduct] = useState<Product>();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        async function getProduct(){
            const product = await productsService.getProduct(parseInt(params?.id));
            setProduct(product)
            setStatus(product.active)
        }
        getProduct()
    }, [])

    const onSubmit = async (data: Product) => {
        const payload = {
            ...data,
            active: status
        }

        try {
            await productsService.updateProduct(payload);
            notifyCustom("Produto atualizado com sucesso", "success")
        } catch {
            notifyCustom("Erro ao tentar atualizar", "error")
        }
    }

    return (
        <FormProduct product={product} onSubmit={onSubmit} status={status} setStatus={setStatus} />
    );

}

export default Products