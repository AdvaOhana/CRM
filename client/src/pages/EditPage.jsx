import { useState } from "react"
import Button from "../components/Button"
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import styles from '../styles/EditPage.module.css'

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
        <div className={styles.pageWrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Edit {clientOrUser}</h2>
                    <Button className={styles.btn} onClick={handleEdit}>{edit ? 'Cancel' : 'Edit'}</Button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {Object.entries(data).map(([key, value]) => (
                        key !== "_id" ? (
                            <div key={key} className={styles.field}>
                                <label>{key}:</label>
                                {edit && key !== "_id" ? (
                                    <input type="text" id={key} value={value} onChange={handleChange} />
                                ) : (<span className={styles.value}>{value}</span>)}
                            </div>
                        ) : null))}
                    {edit && (
                        <div className={styles.actionsBottom}>
                            <Button className={styles.delete} onClick={handleDelete}>Delete</Button>
                            <Button className={styles.primary} type='submit'>Save</Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}


