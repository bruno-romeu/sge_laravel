<<<<<<< HEAD
import { Form, useForm, usePage} from "@inertiajs/react"
=======
import { Form, useForm} from "@inertiajs/react"
import { useEffect } from 'react';
>>>>>>> f00b6002c1ef6cc8b0714147665d91c5e87eb507
import TextInput from "./TextInput"
import PrimaryButton from "./PrimaryButton"
import DangerButton from "./DangerButton"

export default function ProductForm({ product }) {

    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        name: product ? product.name : '',
        quantity: product ? product.quantity : '',
        minimum_quantity: product ? product.minimum_quantity : '',
        price: product ? product.price : '',
        cost_price: product ? product.cost_price : '',
        profit: product ? product.profit : '',
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

    const handleDelete = () => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            destroy(route('products.delete', product.id))
        }
    }

    useEffect(() => {
        if(data.price && data.cost_price) {
            const profitMargin = ((data.price - data.cost_price) / data.cost_price) * 100;
            setData('profit', profitMargin.toFixed(2));
        } else if (data.cost_price && data.profit) {
            const salePrice = data.cost_price / (1 - (data.profit / 100));
            setData('price', salePrice.toFixed(2));
        } else if (data.price && data.profit) {
            const costPrice = data.price * (1 - (data.profit / 100));
            setData('cost_price', costPrice.toFixed(2));
        }
    })


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
                    <TextInput required className="w-full mb-5 [appearance:textfield]" type="number" name="quantity" value={data.quantity} onChange={(e) => setData('quantity', e.target.value)}/>
                    <TextInput required className="w-full mb-5 [appearance:textfield]" type="number" name="minimum_quantity" value={data.minimum_quantity}onChange={(e) => setData('minimum_quantity', e.target.value)}/>
                </div>
                <div className="flex flex-col-3 justify-around gap-4">
                    <div><label htmlFor="price">Preço de Venda</label><span className="text-red-500 ">*</span></div>
                    <label htmlFor="cost_price">Preço de Custo</label>
                    <label htmlFor="profit">Margem de lucro (%)</label>
                </div>
                <div className="flex flex-col-3 gap-4">
                    <TextInput  className="w-full mb-5 [appearance:textfield]" type="number" name="price" value={data.price} onChange={(e) => setData('price', e.target.value)}/>
                    <TextInput required className="w-full mb-5 [appearance:textfield]" type="number" name="cost_price" value={data.cost_price}onChange={(e) => setData('cost_price', e.target.value)}/>
                    <TextInput  className="w-full mb-5 [appearance:textfield]" type="number" name="profit" value={data.profit} onChange={(e) => setData('profit', e.target.value)} />
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
<<<<<<< HEAD
                    {product && product.id &&(
                        <div type="button">
                            <DangerButton className="mt-4" disabled={processing} onClick={handleDelete}>Excluir Produto</DangerButton>
                        </div>
                    )}  
=======
                    {product && product.id && (
                    <div type="button">
                        <DangerButton className="mt-4" disabled={processing} onClick={handleDelete}>Excluir Produto</DangerButton>
                    </div>
                    )}
>>>>>>> f00b6002c1ef6cc8b0714147665d91c5e87eb507
                </div>

            </form>
        </div>
    )
}