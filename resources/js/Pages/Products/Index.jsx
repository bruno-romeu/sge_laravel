import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';
import AddButton from '@/Components/AddButton';

export default function ProductsIndex({listaProdutos}) {
    if (!listaProdutos || listaProdutos.length === 0) {
        return(
            <AuthenticatedLayout
                        header={
                            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                Produtos
                            </h2>
                        }
                    >
                    
                        <Head title="Produtos" />
            
                        <div className="py-12">
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className='mb-10 align-right justify-end flex'>
                                    <Link href='products/create'>
                                        <AddButton>Adicionar +</AddButton>
                                    </Link>
                                </div>
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                    <div className="p-6 text-gray-900 dark:text-gray-100">
                                        Parece que ainda não há produtos cadastrados...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AuthenticatedLayout>
        )
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Produtos
                </h2>
            }
        >
            <Head title='Produtos'></Head>

            <div className='py-12'>
                <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                    <div className='mb-10 align-right justify-end flex'>
                        <Link href='products/create'>
                            <AddButton>Adicionar +</AddButton>
                        </Link>
                    </div>
                    {listaProdutos.map((produtos => (
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 mb-5">
                        
                        <ProductCard produtos={produtos}></ProductCard>
                    </div>
                    )))}

                </div>
            </div>
        </AuthenticatedLayout>  
    )
}