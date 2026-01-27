import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
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
                                    <button onClick={() => location.href='products/create'}>
                                        <AddButton>Adicionar +</AddButton>
                                    </button>
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
                        <button onClick={() => location.href='products/create'}>
                            <AddButton>Adicionar +</AddButton>
                        </button>
                    </div>
                    {listaProdutos.map((produtos => (
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 mb-5">
                        
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col-2 justify-between items-center">
                                <div key={produtos.id}>
                                    <h3 className='capitalize'>{produtos.name}</h3>
                                    <div className='flex flex-col-2 text-gray-300 gap-10'>
                                        <p>Quantidade: {produtos.quantity}</p>
                                        <p>Preço: R${produtos.price}</p>
                                    </div>
                                </div>
                                <button onClick={() => location.href='products/'+produtos.id}>
                                    <div className="flex justify-end text-white hover:bg-gray-700 rounded-lg px-3 py-2 transition duration-150">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </div>
                                </button>
                        </div>
                    </div>
                    )))}

                </div>
            </div>
        </AuthenticatedLayout>  
    )
}