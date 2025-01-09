'use client'
import { productsService } from '@/services/productsService'
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import {Product} from "@/types/Product";
import {notifyCustom} from "@/utils/Notify";
import {ToastContainer} from "react-toastify";
import {Spinner} from "@nextui-org/spinner";

const Products = () => {

    const params = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product>({description: "", id: 0, name: "", price: 0, quantity: 0});
    const [loading, setLoading] = useState(true);
    const [invalidProduct, setInvalidProduct] = useState(false);

    useEffect(() => {
        async function getProduct() {
            try {
                setInvalidProduct(false)
                setLoading(true)
                const product = await productsService.getProduct(Number(params?.id));
                setProduct(product)

            }catch (e) {
                notifyCustom("Erro ao tentar buscar o produto", "error")
                setInvalidProduct(true)
            }finally {
                setLoading(false)
            }
        }

        getProduct()
    }, [params?.id])

    return (
        <div className={"flex w-full items-center justify-center justify-self-center py-10 "}>
            <ToastContainer />
            {
                loading ? (
                    <Spinner />
                ) : (
                    !invalidProduct ? (
                    <Card className="w-[800px]">
                        <CardHeader className="flex gap-3">
                            <div className="flex flex-col">
                                <p className="text-md">{product?.name}</p>
                                <p className="text-small text-default-500">R$ {product?.price}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className={"flex justify-left"}>
                                <p>{product?.description}</p>
                            </div>
                            <p>R$ {product?.price}</p>
                            <p>Quantidade: {product?.quantity}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link showAnchorIcon href={`/produtos/editar/${product?.id}`}>
                                Editar
                            </Link>
                        </CardFooter>
                    </Card>
                    ) : (
                        <Card className="w-[800px]">
                            <CardHeader>
                                <p>Produto não encontrado</p>
                            </CardHeader>
                            <CardFooter>
                                <Link showAnchorIcon href={`/produtos`}>
                                    Voltar
                                </Link>
                            </CardFooter>
                        </Card>
                    )
                )
            }

        </div>
    );

}

export default Products