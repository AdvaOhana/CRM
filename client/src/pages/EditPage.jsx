import { useState } from "react"
import Button from "../components/Button"
import { useParams, useNavigate } from "react-router-dom";
import { useCustomers, useUpdateCustomer, useDeleteCustomer } from "../hooks/useCustomers";


export default function EditPage() {
    const { id } = useParams()
    const { data: customers, isLoading, error } = useCustomers();
    const updateCustomer = useUpdateCustomer();
    const deleteCustomer = useDeleteCustomer();
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()


    const customer = customers.find((customer) => customer._id === id)
    const [data, setData] = useState(customer)

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

    function handleSubmit(e) {
        e.preventDefault()
        updateCustomer.mutate(data)
        setEdit(false)
        navigate("/clients")

    }
    function handleChange(e) {
        const { id, value } = e.target

        setData((current) => ({ ...current, [id]: value }))
    }
    function handleDelete() {
        deleteCustomer.mutate(data._id)
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


