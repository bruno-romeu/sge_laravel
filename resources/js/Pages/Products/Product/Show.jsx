import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductForm from '@/Components/ProductForm';
import TimeLine from '@/Components/TimeLine';

export default function ProductShow({product, inventories}) {
    console.log('DADOS DO PRODUTO:', product);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 capitalize">
                    {'#'+product.id + ' - ' + product.name}
                </h2>
            }
        >

            <Head title='Editar Produto'/>  

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <ProductForm product={product}/>
                        </div>
                    </div>
                </div>
            </div>

            <TimeLine inventories={inventories}></TimeLine>

        </AuthenticatedLayout>
    )
}