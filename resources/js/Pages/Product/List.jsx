import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';

import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import axios from "axios";


export default function ProductsList({ auth, products }) {
    const toast = useRef(null);

    const statusBodyTemplate = (rowData) => {
        const severity = rowData.active ? "success" : "danger";
        const value = rowData.active ? "Ativo" : "Inativo";

        return <Tag severity={severity} value={value}></Tag>;
    }

    const actionsBodyTemplate = (rowData) => {
        const menu = useRef(null);

        let items = [
            {
                label: 'Detalhes',
                icon: 'pi pi-external-link',
                url: route('products.show', { id: rowData.id })
            },
        ]

        // Exibe mais opcoes no menu, caso o usuario esteja logado
        if (auth.user) {
            items = items.concat([
                {
                    label: 'Editar',
                    icon: 'pi pi-pencil',
                },
                {
                    label: rowData.active ? 'Desativar' : 'Ativar',
                    icon: rowData.active ? 'pi pi-lock' : 'pi pi-lock-open',
                    command: () => { showStatusDialog(rowData.id, rowData.active) }
                },
                {
                    label: 'Excluir',
                    icon: 'pi pi-trash',
                    command: () => { showDeleteDialog(rowData.id) }
                },
            ])
        }

        return (
            <>
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <i className="pi pi-ellipsis-h" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup style={{ fontSize: '1.4rem', cursor: 'pointer' }}></i>
            </>
        )
    }

    const showStatusDialog = (productId, productStatus) => {
        confirmDialog({
            group: 'templating',
            header: 'Confirmar',
            message: `Tem certeza que deseja ${productStatus ? 'desativar' : 'ativar'} esse produto?`,
            icon: productStatus ? 'pi pi-lock' : 'pi pi-lock-open',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                axios
                    .put(
                        route('api.product.update', { id: productId }),
                        {
                            active: !productStatus
                        },
                        {
                            headers: {
                                'Authorization': 'Bearer ' + auth.token
                            }
                        }
                    )
                    .then((response) => {
                        window.location.reload()
                    })
                    .catch((error) => {
                        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível alterar o status do produto.', life: 3000 });
                    })
            },
        });
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
                        window.location.reload()
                    })
                    .catch((error) => {
                        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível excluir o produto.', life: 3000 });
                    })
            },
        });
    }

    return (
        <MainLayout
            user={auth.user}
        >
            <Head title="Produtos" />

            <Toast ref={toast} />
            <ConfirmDialog group='templating' />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable className='px-3 pt-3' removableSort stripedRows value={products}>
                            <Column field="id" header="ID" sortable></Column>
                            <Column field="name" header="Nome" sortable></Column>
                            <Column field="quantity" header="Quantidade" sortable></Column>
                            <Column field="active" header="Status" sortable body={statusBodyTemplate}></Column>
                            <Column header="Ações" body={actionsBodyTemplate} align="center" style={{ width: '10%' }}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
