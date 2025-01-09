import {ToastContainer} from "react-toastify";
import {Switch} from "@nextui-org/switch";
import {Input} from "@nextui-org/input";
import {Button, Divider} from "@nextui-org/react";
import Link from "next/link";
import {Product} from "@/types/Product";


interface FormProductProps {
    product?: Product;
    setProduct: () => Product;
    onSubmit: (data: Product) => void | Promise<void>;
    status: boolean;
    setStatus: (status: boolean) => void;
}
const FormProduct = ({ product, setProduct, onSubmit, status, setStatus}: FormProductProps) => {

    return (
        <div className={"flex w-full self-center justify-self-center items-center justify-center px-4 py-8"}>
            <ToastContainer/>
            <form className={"flex flex-col items-center justify-center w-full space-y-4"}>
                <div className="flex w-full flex-col gap-2 items-start ">
                    <Switch isSelected={status} onValueChange={() => setStatus(!status)}>
                        Status do produto
                    </Switch>
                </div>

                <Input type="text" value={product?.name} label="Nome" className={"h-12"}
                       onChange={(e) => setProduct({...product, name: e.target.value})}/>
                <Input type="text" value={product?.description} label="Descrição" className={"h-12"}
                       onChange={(e) => setProduct({...product, description: e.target.value})}/>
                <Input type="text" value={product?.price} label="Preço" className={"h-12"}
                       onChange={(e) => setProduct({...product, price: e.target.value})}/>
                <Input type="number" value={product?.quantity} label="Quantidade" className={"h-12"}
                       onChange={(e) => setProduct({...product, quantity: e.target.value})}/>

                <Button className={"bg-green-900 text-white w-full  font-bold"} onClick={() => onSubmit(product)}>
                    Salvar
                </Button>

                <Divider/>
                <div className="flex w-full justify-end">
                    <Link href={'/produtos'}>
                        <Button className={"bg-gray-400 text-white w-full font-bold"}>
                            Voltar
                        </Button>
                    </Link>
                </div>

            </form>
        </div>
    );
}

export default FormProduct;