import { Link } from "@inertiajs/react"
import { useState } from "react"
import Modal from "./Modal"
import InventoryForm from "./InventoryForm";

export default function ProductCard({produtos}) {
        const [inventoryMovimentation, setInventoryMovimentation] = useState(false);

        const openModal = () => setInventoryMovimentation(true);
        const closeModal = () => {
            setInventoryMovimentation(false);
        };


        const handleSuccess = () => {
            closeModal();
        };

    return (
        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col-2 justify-between items-center">
            <div key={produtos.id}>
                <div className="flex gap-4">
                    <h3 className='capitalize'>{produtos.name}</h3>
                    {produtos.quantity <= produtos.minimum_quantity ?
                    <svg class="w-6 h-6 text-yellow-500 dark:text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
                    </svg> :
                    null
                    }
                </div>
                <div className='flex flex-col-2 dark:text-gray-300 gap-10'>
                    <p>Quantidade: {produtos.quantity}</p>
                    <p>Preço: R${produtos.price}</p>
                </div>
            </div>
            <div className="flex">
                <button onClick={openModal}>
                    <div className="flex justify-end text-white hover:bg-indigo-300 dark:hover:bg-gray-700 rounded-lg px-3 py-2 transition duration-150">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.4 6.763c-.251.1-.383.196-.422.235L6.564 5.584l2.737-2.737c1.113-1.113 3.053-1.097 4.337.187l1.159 1.159a1 1 0 0 1 1.39.022l4.105 4.105a1 1 0 0 1 .023 1.39l1.345 1.346a1 1 0 0 1 0 1.415l-2.052 2.052a1 1 0 0 1-1.414 0l-1.346-1.346a1 1 0 0 1-1.323.039L11.29 8.983a1 1 0 0 1 .04-1.324l-.849-.848c-.18-.18-.606-.322-1.258-.25a3.271 3.271 0 0 0-.824.202Zm1.519 3.675L3.828 16.53a1 1 0 0 0 0 1.414l2.736 2.737a1 1 0 0 0 1.414 0l6.091-6.091-4.15-4.15Z"/>
                        </svg>
                    </div>
                </button>
                <Link href={'products/'+produtos.id} >
                    <div className="flex justify-end text-white hover:bg-indigo-300 dark:hover:bg-gray-700 rounded-lg px-3 py-2 transition duration-150">
                        <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
                        </svg>

                    </div>
                </Link>
            </div>

            <Modal show={inventoryMovimentation} onClose={closeModal}>
                <div className="p-6 flex flex-col justify-center items-center">
                    <h2 className="dark:text-white font-bold text-center text-2xl rounded-md p-4 w-fit">Adicionar Movimentação de Estoque</h2>
                    <InventoryForm product={produtos} onSuccess={handleSuccess} onCancel={closeModal}/>
                </div>
            </Modal>

        </div>
    )
}