import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <MainLayout
            user={auth.user}
        >
            <Head title="Produtos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {auth.user ? (
                            <div className="p-6 text-gray-900">Está logado!</div>
                        ) : (
                            <div className="p-6 text-gray-900">Não está logado!</div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
