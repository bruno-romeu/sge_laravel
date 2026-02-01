

export default function TimeLine({inventories}) {
    if (!inventories || inventories.length === 0) {
        return (
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Parece que ainda não há registros de movimentação do produto...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 ">
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-5">
                            {inventories.map((item => (
                            <div key={item.id} className="bg-indigo-200 dark:bg-gray-600 p-4 sm:rounded-lg shadow-sm overflow-hidden">
                                <div className="flex items-center w-full">
                                     <div className="flex items-center gap-2 flex-1 justify-between">
                                         <h3 className="font-extrabold">#{item.id}</h3>
                                         <p>
                                            {item.description? item.description : "Movimentação sem descrição."}</p>
                                     </div>
                                     <span className="mx-4 ml-10 mr-10">|</span> 
                                     <div className="flex items-center justify-between flex-1">
                                        <h3>
                                            {item.type_label}: {item.quantity}
                                        </h3>
                                        <h3>{item.created_at}</h3>
                                    </div>
                                </div>
                            </div>
                            )))}
                        </div>
                </div>
            </div>
        </div>  
    )
    
}