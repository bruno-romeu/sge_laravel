import { Form } from "@inertiajs/react"
import TextInput from "./TextInput"
import PrimaryButton from "./PrimaryButton"

export default function ProductForm() {
    return (
        <div className="flex flex-col text-center">
            <Form action='/products' method='post'>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <TextInput required className="w-full mb-5" type="text" name="name"/>
                </div>
                <div className="flex flex-col-2 justify-around gap-4">
                    <label htmlFor="quantity">Quantidade:</label>
                    <label htmlFor="price">Preço:</label>
                </div>
                <div className="flex flex-col-2 gap-4">
                    <TextInput required className="w-full mb-5 [appearance:textfield]" type="number" name="quantity"/>
                    <TextInput required className="w-full mb-5 [appearance:textfield]" type="number" name="price"/>
                </div>
                <div className="text-center">
                    <button type="submit">
                        <PrimaryButton className="mt-4  ">Cadastrar</PrimaryButton>
                    </button>
                </div>

            </Form>
        </div>
    )
}