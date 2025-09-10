import { useState } from 'react';
import { useAddClients } from '../hooks/useClients';
import styles from '../styles/AddForm.module.css'
import Button from './Button'

export default function AddForm() {
    const { mutate: addClient, isPending, error } = useAddClients()

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        description: ""
    });
    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault()
        addClient(form)
    }
    return (<form onSubmit={handleSubmit} className={styles.form}>
        {error && (
            <p style={{ color: "red" }}>Error: {error.message}</p>
        )}
        <div className={styles.field}>
            <label>Full Name:</label>
            <input type='text' placeholder='Full Name' name='name' value={form.name} onChange={handleChange} />
        </div>
        <div className={styles.field}>
            <label>Phone:</label>
            <input type='text' placeholder='Phone' name='phone' value={form.phone} onChange={handleChange} />
        </div>
        <div className={styles.field}>
            <label>Email:</label>
            <input type='text' placeholder='Email' name='email' value={form.email} onChange={handleChange} />
        </div>
        <div className={styles.field}>
            <label>Description:</label>
            <textarea type='text' placeholder='Description' name='description' value={form.description} onChange={handleChange} />
        </div>
        <Button disable={isPending}>{isPending ? 'Creating...' : 'Add'}</Button>
    </form>
    )
}