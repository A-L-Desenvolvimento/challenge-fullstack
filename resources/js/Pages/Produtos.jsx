import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';

import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Menu } from "primereact/menu";
import { useRef } from "react";


export default function Produtos({ auth, products }) {

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
                url: `/produtos/${rowData.id}`
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
                },
                {
                    label: 'Excluir',
                    icon: 'pi pi-trash',
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

    return (
        <MainLayout
            user={auth.user}
        >
            <Head title="Produtos" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable className='px-3 pt-3' value={products}>
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
