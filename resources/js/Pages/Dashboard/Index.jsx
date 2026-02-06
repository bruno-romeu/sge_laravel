import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({kpis, low_stock_products}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
        
            <Head title="Dashboard" />

            <div className="py-12">
                <div className='flex flex-col gap-10'>
                    <section className="flex flex-col-3 gap-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className='flex flex-col gap-4'>
                                    <h2>Total de Produtos Cadastrados</h2>
                                    <span className='text-4xl text-blue-500 text-center font-extrabold'>{kpis.total_items}</span>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className='flex flex-col gap-4'>
                                    <h2>Valor Total em Estoque</h2>
                                    <span className='text-4xl text-green-500 text-center font-extrabold'>R$ {kpis.total_cost_value}</span>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className='flex flex-col gap-4'>
                                    <h2>Produtos com Pouco Estoque</h2>
                                    <span className='text-4xl text-yellow-500 text-center font-extrabold'>{kpis.low_stock_quantity}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className=' ml-10 mr-10 flex flex-col gap-4'>
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 right-0 ">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div>
                                    <h1 className='font-extrabold text-2xl'>Lista de Produtos com estoque Baixo</h1>
                                    <hr className='border-gray-100 my-4 opacity-50'/>
                                    {low_stock_products.map((produto => {
                                        return(
                                            <Link href={'products/' + produto.id}>
                                                <div key={produto.id} className="p-4 mb-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-md flex items-center ">
                                                    <div>
                                                        <h3 className='capitalize text-md'>{produto.name}</h3>
                                                        <p>Estoque Atual: <span className='font-bold'>{produto.quantity}</span> | Estoque Mínimo: <span className='font-bold'>{produto.minimum_quantity}</span></p>
                                                    </div>
                                                    <svg className='ml-auto w-6 h-6 text-gray-800 dark:text-white items-center' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
                                                    </svg>
                                                </div>
                                            </Link>
                                        
                                        )
                                    }))}
                                </div>
                                
                            </div>
                            
                        </div>
                        {kpis.low_stock_quantity > 5 && (
                            <Link href={route('products.index')}>
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 right-0 flex items-center justify-center p-8 gap-5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                                        <p className='dark:text-white font-semibold'>Consulte o restante dos produtos abaixo do estoque</p>
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 7 4 4 4-4m-8 6 4 4 4-4"/>
                                        </svg>
                                </div>
                            </Link>
                        )}
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
