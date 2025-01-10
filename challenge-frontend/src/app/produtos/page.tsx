'use client'
import {productsService} from '@/services/productsService'
import {
    Button,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {Spinner} from "@nextui-org/spinner";
import EyeIcon from "@/assets/icons/EyeIcon";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import {getSession} from "next-auth/react";
import {ToastContainer} from 'react-toastify';
import {notifyCustom} from "@/utils/Notify";
import {Product} from "@/types/Product";
import {User} from "next-auth";
import {isEmpty} from "@nextui-org/shared-utils";

const Products = () => {
    const [userSession, setUserSession] = useState<User | null | undefined>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
    const [refresh, setRefresh] = useState(false);

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const Real = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const columns = [
        {name: "Nome", uid: "name"},
        {name: "Descrição", uid: "description"},
        {name: "Preço", uid: "price"},
        {name: "Quantidade", uid: "quantity"},
        {name: "Status", uid: "status"},
        {name: "Ações", uid: "actions"},
    ];


    useEffect(() => {
        async function session() {
            const user = await getSession()
            return user?.user as User
        }

        session().then(r => setUserSession(r))
    }, []);

    useEffect(() => {
        async function getProducts() {
            try {
                const products = await productsService.listAll(page);
                setLastPage(products?.last_page)
                setProducts(products?.data)
            }catch (e) {
                notifyCustom("Erro ao buscar produtos!", 'error')
                setProducts([])
                console.log(e)
            } finally {
                setLoading(false)
            }

        }

        getProducts().then(r => r)
    }, [page, refresh])

    const renderTextCell = (value: string) => (
        <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{value}</p>
        </div>
    );

    const renderPriceCell = (value: string) => (
        <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{Real.format(parseFloat(value))}</p>
        </div>
    );

    const renderStatusChip = (product: Product) => (
        <Chip
            className="capitalize"
            color={product?.active ? 'success' : 'danger'}
            size="sm"
            variant="flat"
        >
            {product?.active ? 'Ativo' : 'Inativo'}
        </Chip>
    );

    const renderActions = (product: Product, userSession: User | null | undefined) => (
        <div className="relative flex items-center gap-2">
            <Link href={`/produtos/${product?.id}`}>
                <Tooltip content="Detalhe">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EyeIcon/>
                    </span>
                </Tooltip>
            </Link>
            {
                userSession && (
                    <>
                        <Link href={`/produtos/editar/${product?.id}`}>
                            <Tooltip content={`Editar produto `}>
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EditIcon/>
                                </span>
                            </Tooltip>
                        </Link>
                        <div onClick={() => handleOpenModal(product)}>
                            <Tooltip color="danger" content="Excluir produto">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon/>
                                </span>
                            </Tooltip>
                        </div>
                    </>
                )
            }
        </div>
    );

    const renderCell = useCallback((product: Product, columnKey: string, userSession: User | null | undefined) => {
        switch (columnKey) {
            case "name":
                return renderTextCell(product?.name);
            case "price":
                return renderPriceCell(product?.price.toString());
            case "status":
                return renderStatusChip(product);
            case "actions":
                return renderActions(product, userSession);
            case "description":
                return renderTextCell(product?.description);
            case "quantity":
                return renderTextCell(product?.quantity.toString());
            default:
                return '-';
        }
    }, []);

    const handleOpenModal = (product: Product) => {
        setDeleteProduct(product)
        onOpen()
    }


    const handleDeleteProduct = async (id: number | null) => {
        if (!id) {
            notifyCustom("Erro ao excluir produto!", 'error')
            return
        }

        try {
            await productsService.deleteProduct(id);
            notifyCustom("Produto excluído com sucesso!")
            onClose()
        }catch (e) {
            notifyCustom("Erro ao excluir produto!", 'error')
            console.log(e)
            return
        }finally {
            setRefresh(!refresh)
        }
    }

    return (
        <div className={"flex mx-8 my-4 flex-col"}>
            <ToastContainer/>
            <div className={"flex w-full items-end py-4"}>
                <Link href={"/produtos/criar"}>
                    <Button className="bg-green-900 text-white font-bold">Criar Produto</Button>
                </Link>
            </div>
            <Table aria-label="Produtos"
                   bottomContent={
                       page > 0 ? (
                           <div className="flex w-full justify-center">
                               <Pagination
                                   isCompact
                                   showControls
                                   showShadow
                                   color="primary"
                                   page={page}
                                   total={lastPage}
                                   onChange={(page) => setPage(page)}
                               />
                           </div>
                       ) : null
                   }
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={products} isLoading={loading} loadingContent={<Spinner/>} emptyContent={products == [] && <EmptyContent />}>
                    {
                        isEmpty(products) ? (
                            <TableRow key="1">
                                <TableCell aria-colspan={6} colSpan={6} >
                                    <div className="flex flex-col items-center gap-4">
                                        <p className="text-lg font-bold">Nenhum produto encontrado!</p>
                                        <p className="text-sm">Clique no botão "Criar Produto" para adicionar um novo produto.</p>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden"> </TableCell>
                                <TableCell className="hidden"> </TableCell>
                                <TableCell className="hidden"> </TableCell>
                                <TableCell className="hidden"> </TableCell>
                                <TableCell className="hidden"> </TableCell>
                            </TableRow>
                        ) : (
                            (item: Product) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey.toString(), userSession)}</TableCell>}
                                </TableRow>
                            )
                        )
                    }
                </TableBody>
            </Table>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Deseja realmente excluir o
                                produto?</ModalHeader>
                            <ModalBody>
                                <p>
                                    O produto <span className={"font-bold"}>{deleteProduct?.name} </span>
                                    será excluido, essa ação não poderá ser revertida.
                                </p>
                                <p className={"font-bold capitalize"}>
                                    Tem certeza?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Não
                                </Button>
                                <Button color="primary" onPress={() => deleteProduct?.id && handleDeleteProduct(deleteProduct.id)}>
                                    Sim
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}



export default Products;
