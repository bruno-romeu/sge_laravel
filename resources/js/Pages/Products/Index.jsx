import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ProductsIndex() {
    return (
        <AuthenticatedLayout>
            <Head title='Produtos'></Head>
        </AuthenticatedLayout>
    )
}