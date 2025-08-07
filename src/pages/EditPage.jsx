import { useParams } from "react-router-dom"
import { useState } from "react"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

export default function EditPage({ customers, onEdit }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false)
    const customer = customers.find((customer) => customer.id === Number(id))
    const [data, setData] = useState(customer)

    function handleSubmit(e) {
        e.preventDefault()
        onEdit((prevArr) => prevArr.map((customer) => customer.id === data.id ? data : customer))
        setEdit(false)
        navigate('/customers')
    }
    function handleChange(e) {

        const { id, value } = e.target
        setData((current) => ({ ...current, [id]: value }))


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
                {edit && <Button type='submit'>Save</Button>}
            </form>
        </div>
    )
}


