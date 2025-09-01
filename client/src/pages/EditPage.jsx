import { useState } from "react"
import Button from "../components/Button"
import { useParams, useNavigate, useSearchParams } from "react-router-dom";


export default function EditPage({ useItems, useUpdate, useDelete, clientOrUser, redirectPath }) {
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: items, isLoading, error } = useItems();
    const updateItem = useUpdate();
    const deleteItem = useDelete();
    const [edit, setEdit] = useState(searchParams.get('edit') === 'true')
    const navigate = useNavigate()


    const item = items?.find((item) => item._id === id)
    const [data, setData] = useState(item)

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

    function handleSubmit(e) {
        e.preventDefault()
        updateItem.mutate(data)
        setEdit(false)
        navigate(redirectPath)

    }
    function handleChange(e) {
        const { id, value } = e.target
        setData((current) => ({ ...current, [id]: value }))
    }
    function handleDelete() {
        deleteItem.mutate(data._id)
        navigate(redirectPath)

    }

    function handleEdit() {
        setSearchParams(edit ? { edit: 'false' } : { edit: 'true' })
        setEdit((edit) => !edit)
    }

    return (
        <div>
            <h1>Edit {clientOrUser}</h1>
            <Button onClick={handleEdit}>{edit ? 'Cancel' : 'Edit'}</Button>
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


