import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function InventoryForm({product, inventory, onSuccess, onCancel}) {
    const [selectType, setType] = useState('addition');

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product ? product.id : '',
        type: 'addition',
        quantity: inventory ? inventory.quantity : null,
        description: inventory ? inventory.description : '',
    })

    const submit = (e) => {
        e.preventDefault();

        post(route('inventory.store'), {
            preserveScroll: true,

            onSuccess: () => {
                reset();
                onSuccess?.();
            },
        });
    };

    return (
        <div className="flex flex-col text-center p-10 text-white">
            <form onSubmit={submit}>
                <div className="flex flex-row gap-20">
                    <div className="flex flex-col w-20">
                        <label htmlFor="name">ID</label>
                        <TextInput disabled className="[appearance:textfield] mb-5" type="number" name="id" value={data.product_id} onChange={(e) => setData('product_id', e.target.value)}/>
                    </div>
                    <div className="flex flex-col-2 justify-start gap-20">
                        <div>
                            <label htmlFor="type">Tipo</label>
                            <div className="flex flex-row gap-10">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="selectType"
                                        value="addition"
                                        checked={selectType === 'addition'}
                                        onChange={(e) => {
                                            setType('addition')
                                            setData('type', e.target.value)
                                        }}
                                    />
                                    Adição
                                </label>
                                <label className="flex items-center gap-2 ">
                                    <input
                                        type="radio"
                                        name="selectType"
                                        value="removal"
                                        checked={selectType === 'removal'}
                                        onChange={(e) => {
                                            setType('removal')
                                            setData('type', e.target.value)
                                        }}
                                    />
                                    Subtração
                                </label>
                            </div>
                        </div>
                    
                        <div>
                            <label htmlFor="quantity">Quantidade</label>
                            <TextInput required className="w-full mb-5 [appearance:textfield]" type="number" name="quantity" value={data.quantity} onChange={(e) => setData('quantity', Number(e.target.value))}/>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-start">
                    <label htmlFor="description">Descrição</label>

                    <div>
                        <textarea required rows={1} className=" w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600" type="text" name="description" value={data.description}onChange={(e) => setData('description', e.target.value)}/>
                    </div>
                </div>
                <div className="text-center flex flex-col-2 gap-4 justify-center">
                        <PrimaryButton type='submit' className="mt-4" disabled={processing}>Registrar Movimentação</PrimaryButton>
                        <SecondaryButton className="mt-4" type="button" onClick={onCancel}> Cancelar </SecondaryButton>
                </div>

            </form>
        </div>
    )
}