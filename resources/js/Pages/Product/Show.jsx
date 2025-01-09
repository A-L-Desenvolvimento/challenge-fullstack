import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Menu } from 'primereact/menu';
import { useRef } from 'react';
import { Badge } from 'primereact/badge';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

export default function ProductShow({ auth, product }) {
    const toast = useRef(null);

    const MenuOptions = () => {
        const menu = useRef(null);

        const items = [
            {
                label: 'Editar',
                icon: 'pi pi-pencil',
            },
            {
                label: product.active ? 'Desativar' : 'Ativar',
                icon: product.active ? 'pi pi-lock' : 'pi pi-lock-open',
            },
            {
                label: 'Excluir',
                icon: 'pi pi-trash',
                command: () => { showDeleteDialog(product.id) }
            },
        ];

        return (
            <div className='pl-2'>
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <i className="pi pi-ellipsis-v" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup style={{ cursor: 'pointer' }}></i>
            </div>
        );
    }

    const showDeleteDialog = (productId) => {
        confirmDialog({
            group: 'templating',
            header: 'Confirmar',
            message: 'Tem certeza que deseja excluir esse produto?',
            icon: 'pi pi-trash',
            defaultFocus: 'reject',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                axios
                    .delete(
                        route('api.product.destroy', { id: productId }),
                        {
                            headers: {
                                'Authorization': 'Bearer ' + auth.token
                            }
                        }
                    )
                    .then((response) => {
                        window.location.href = route('products.list')
                    })
                    .catch((error) => {
                        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível excluir o produto.', life: 3000 });
                    })
            },
        });
    }

    const StatusBadge = () => {
        const severity = product.active ? "success" : "danger";
        const value = product.active ? "Ativo" : "Inativo";

        return <Badge className='absolute' style={{ top: '0.3rem', right: '0.3rem' }} severity={severity} value={value}></Badge>;
    }

    return (
        <MainLayout
            user={auth.user}
        >
            <Head title="Detalhes" />

            <Toast ref={toast} />
            <ConfirmDialog group='templating' />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col md:flex-row p-4 gap-4">
                            <div className="md:w-1/2 mb-4 md:mb-0 relative">
                                <img style={{ borderRadius: '10px' }} src='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='>
                                </img>
                                <StatusBadge />
                            </div>

                            <div className="md:w-1/2 flex flex-col justify-between">
                                <div className="mb-4 flex justify-between items-center">
                                    <h2><b>#{product.id}</b> - {product.name}</h2>
                                    {auth.user && <MenuOptions />}
                                </div>
                                <div className="mb-4">
                                    <p>{product.description}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <div>
                                        <span>Quantidade: </span>
                                        <Badge severity='secondary' value={product.quantity}></Badge>
                                    </div>
                                    <Tag severity="success" value={`R$ ${product.price.toString().replace('.', ',')}`}></Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}