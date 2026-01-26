import { Form, useForm, usePage} from "@inertiajs/react"
import TextInput from "./TextInput"
import PrimaryButton from "./PrimaryButton"
import DangerButton from "./DangerButton"
import Notification from "./Notification"

export default function ProductForm({ product }) {

    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        name: product ? product.name : '',
        quantity: product ? product.quantity : '',
        price: product ? product.price : '',
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

    const { flash } = usePage().props;
    if (flash.success) {
        return <Notification title={'Sucesso!'} message={'Produto cadastrado no estoque!'} />
    } else if (flash.error) {
        return <Notification title={'Erro'} message={'Ocorreu um erro ao cadastrar o produto.'}/>
    }
    

    return (
        <div className="flex flex-col text-center">
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <TextInput required className="w-full mb-5" type="text" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>
                <div className="flex flex-col-2 justify-around gap-4">
                    <label htmlFor="quantity">Quantidade:</label>
                    <label htmlFor="price">Preço:</label>
                </div>
                <div className="flex flex-col-2 gap-4">
                    <TextInput required className="w-full mb-5 [appearance:textfield]" type="number" name="quantity" value={data.quantity} onChange={(e) => setData('quantity', e.target.value)}/>
                    <TextInput required className="w-full mb-5 [appearance:textfield]" type="number" name="price" value={data.price}onChange={(e) => setData('price', e.target.value)}/>
                </div>
                <div className="text-center flex flex-col-2 gap-4 justify-center">
                    <button type="submit">
                        <PrimaryButton className="mt-4" disabled={processing}>{product ? 'Salvar Alterações' : 'Cadastrar Produto'}</PrimaryButton>
                    </button>
                    {product && product.id &&(
                        <div type="button">
                            <DangerButton className="mt-4" disabled={processing} onClick={handleDelete}>Excluir Produto</DangerButton>
                        </div>
                    )}  
                </div>

            </form>
        </div>
    )
}