import { useState } from "react"
import Button from "../components/Button"
import { useCustomers } from "../contexts/CustomerContext"
import { useParams, useNavigate } from "react-router-dom";

export default function EditPage() {
    const { id } = useParams()
    const [edit, setEdit] = useState(false)
    const { customers, updateCustomer, deleteCustomer } = useCustomers()
    const navigate = useNavigate()


    const customer = customers.find((customer) => customer.id === Number(id))
    const [data, setData] = useState(customer)


    function handleSubmit(e) {
        e.preventDefault()
        updateCustomer(data)
        setEdit(false)
        navigate("/customers")

    }
    function handleChange(e) {
        const { id, value } = e.target
        setData((current) => ({ ...current, [id]: value }))
    }
    function handleDelete() {
        deleteCustomer(data.id)
        navigate("/customers")

    }

    return (
        <div>
            <h1>Edit Customer</h1>
            <Button onClick={() => setEdit((edit) => !edit)}>{edit ? 'Cancel' : 'Edit'}</Button>
            <form onSubmit={handleSubmit}>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong>
                        {edit && key !== "id" ? (
                            <input type="text" id={key} value={value} onChange={handleChange} />
                        ) : (<span>{value}</span>)}
                    </div>
                ))}
                {edit && (
                    <>
                        <Button onClick={handleDelete}>Delete</Button>
                        <Button type='submit'>Save</Button>
                    </>
                )}
            </form>
        </div>
    )
}


