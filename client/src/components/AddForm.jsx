import { useState } from 'react';
import { useAddCustomer } from '../hooks/useCustomers';

export default function AddForm() {
    const { mutate: addCustomer, isPending } = useAddCustomer()

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if (!name || !phone || !email) return

        const newCustomer = {
            id: Date.now(),
            name,
            phone,
            email,
            description
        }
        addCustomer(newCustomer)
        setName("")
        setPhone("")
        setEmail("")
        setDescription("")
    }
    return (<form onSubmit={handleSubmit}>
        <input type='text' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='text' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <button disable={isPending}>{isPending ? 'Creating...' : 'Add'}</button>
    </form>
    )
}