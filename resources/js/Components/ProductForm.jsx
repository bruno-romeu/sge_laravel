import { useForm} from "@inertiajs/react"
import { useState } from 'react';
import TextInput from "./TextInput"
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton"
import Modal from "./Modal";

export default function ProductForm({ product }) {
    const [confirmingProductDeletion, setConfirmingProductDeletion] = useState(false);
    const [pricingMode, setPricingMode] = useState('price');

    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        name: product ? product.name : '',
        quantity: product ? product.quantity : null,
        minimum_quantity: product ? product.minimum_quantity : null,
        price: product ? product.price : null,
        cost_price: product ? product.cost_price : null,
        profit: product ? product.profit : null,
        description: product ? product.description : '',
    })

    const submit = (e) => {
        e.preventDefault();
        if (product && product.id) {
            put(route('products.update', product.id));
        } else {
            post(route('products.store'));
        }
    };

    const confirmProductDeletion = () => {
        setConfirmingProductDeletion(true);
    };

    const handleDelete = (e) => {
        e.preventDefault();

        destroy(route('products.destroy', product.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingProductDeletion(false);

        clearErrors();
        reset();
    };

    const parseNumber = (value) => {
    if (value === '' || value === null) return null;
    return Number(String(value).replace(',', '.'));
};

    const calculateProfit = (price, cost) => {
    if (price == null || cost == null || cost <= 0) return null;
    return Number((((price - cost) / cost) * 100).toFixed(2));
    };

    const calculatePrice = (cost, profit) => {
        if (cost == null || profit == null) return null;
        return Number((cost / (1 - profit / 100)).toFixed(2));
    };

    const handlePriceChange = (e) => {
        const price = parseNumber(e.target.value);
        setData('price', price);

        if (pricingMode === 'price') {
            const profit = calculateProfit(price, data.cost_price);
            setData('profit', profit);
        }
    };

    const handleProfitChange = (e) => {
        const profit = parseNumber(e.target.value);
        setData('profit', profit);

        if (pricingMode === 'profit') {
            const price = calculatePrice(data.cost_price, profit);
            setData('price', price);
        }
    };

    const handleCostChange = (e) => {
        const cost = parseNumber(e.target.value);
        setData('cost_price', cost);

        if (pricingMode === 'price') {
            const profit = calculateProfit(data.price, cost);
            setData('profit', profit);
        }

        if (pricingMode === 'profit') {
            const price = calculatePrice(cost, data.profit);
            setData('price', price);
        }
    };


    return (

        <div className="flex flex-col text-center">
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <span className="text-red-500 position-absolute">*</span>
                    <TextInput required className="w-full mb-5" type="text" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>
                <div className="flex flex-col-2 justify-around gap-4">
                    <div><label htmlFor="quantity">Quantidade</label><span className="text-red-500 ">*</span></div>
                    
                    <label htmlFor="minimum_quantity">Estoque Mínimo</label>
                </div>
                <div className="flex flex-col-2 gap-4">
                    <TextInput required className="w-full mb-5 [appearance:textfield]" type="number" name="quantity" value={data.quantity} onChange={(e) => setData('quantity', Number(e.target.value))}/>
                    <TextInput className="w-full mb-5 [appearance:textfield]" type="number" name="minimum_quantity" value={data.minimum_quantity} onChange={(e) => setData('minimum_quantity', Number(e.target.value))}/>
                </div>
                <div className="flex flex-col-3 justify-around gap-4">
                    <div><label htmlFor="price">Preço de Venda</label><span className="text-red-500 ">*</span></div>
                    <label htmlFor="cost_price">Preço de Custo</label>
                    <label htmlFor="profit">Margem de lucro (%)</label>
                </div>
                <div className="flex flex-col-3 gap-4">
                    <TextInput step="0.01" className="w-full mb-5 [appearance:textfield]" type="number" name="price" value={data.price} onChange={handlePriceChange} disabled={pricingMode === 'profit'}/>
                    <TextInput step="0.01" className="w-full mb-5 [appearance:textfield]" type="number" name="cost_price" value={data.cost_price} onChange={handleCostChange}/>
                    <TextInput step="0.01" className="w-full mb-5 [appearance:textfield]" type="number" name="profit" value={data.profit} onChange={handleProfitChange} disabled={pricingMode === 'price'}/>
                </div>

                <div className="flex gap-4 mb-4 justify-center">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="pricingMode"
                            value="price"
                            checked={pricingMode === 'price'}
                            onChange={() => setPricingMode('price')}
                        />
                        Definir preço de venda
                    </label>

                    <label className="flex items-center gap-2 ">
                        <input
                            type="radio"
                            name="pricingMode"
                            value="profit"
                            checked={pricingMode === 'profit'}
                            onChange={() => setPricingMode('profit')}
                        />
                        Definir margem de lucro
                    </label>
                </div>
                <div className="w-full">
                    <label htmlFor="description">Descrição</label>
                </div>
                <div>
                    <textarea rows={5} className=" w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600" type="text" name="description" value={data.description}onChange={(e) => setData('description', e.target.value)}/>
                </div>
                <div className="text-center flex flex-col-2 gap-4 justify-center">
                    <button type="submit">
                        <PrimaryButton className="mt-4" disabled={processing}>{product ? 'Salvar Alterações' : 'Cadastrar Produto'}</PrimaryButton>
                    </button>
                    {product && product.id &&(
                        <div>
                            <DangerButton type="button" className="mt-4" disabled={processing} onClick={confirmProductDeletion}>Excluir Produto</DangerButton>
                        </div>
                    )}  

                </div>

            </form>
            <div>
                <Modal show={confirmingProductDeletion} onClose={closeModal}>
                    <div className="p-6 ">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Você tem certeza que deseja excluir este produto?
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Uma vez que o produto for excluído, todos os seus dados serão apagados permanentemente.
                        </p>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>
                                Cancelar
                            </SecondaryButton>
                            <DangerButton className="ms-3" disabled={processing} onClick={handleDelete}>
                                Excluir Produto
                            </DangerButton>
                        </div>
                    </div>

                </Modal>
            </div>
        </div>
    )
}