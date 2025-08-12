import { useState } from "react"
import Button from "../components/Button"
import { useCustomers } from "../contexts/CustomerContext"
import { useParams, useNavigate } from "react-router-dom";

export default function EditPage() {
    const { id } = useParams()
    const [edit, setEdit] = useState(false)
    const { customers, updateCustomer, deleteCustomer } = useCustomers()
    const navigate = useNavigate()


    const customer = customers.find((customer) => customer._id === id)
    const [data, setData] = useState(customer)


    function handleSubmit(e) {
        e.preventDefault()
        updateCustomer(data)
        setEdit(false)
        navigate("/clients")

    }
    function handleChange(e) {
        const { id, value } = e.target

        setData((current) => ({ ...current, [id]: value }))
    }
    function handleDelete() {
        deleteCustomer(data._id)
        navigate("/clients")

    }

    return (
        <div>
            <h1>Edit Customer</h1>
            <Button onClick={() => setEdit((edit) => !edit)}>{edit ? 'Cancel' : 'Edit'}</Button>
            <form onSubmit={handleSubmit}>
                {Object.entries(data).map(([key, value]) => (
                    key !== "_id" ? (
                        <div key={key}>
                            <strong>{key}:</strong>
                            {edit && key !== "_id" ? (
                                <input type="text" id={key} value={value} onChange={handleChange} />
                            ) : (<span>{value}</span>)}
                        </div>
                    ) : null))}
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


