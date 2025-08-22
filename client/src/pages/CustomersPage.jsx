import { FaUserPlus, FaThLarge, FaTable } from 'react-icons/fa';
import { useCustomers } from '../hooks/useCustomers';
import { useView } from '../contexts/ViewContext'
import { useState } from 'react';
import Cards from '../components/Cards'
import Table from '../components/Table'
import Button from '../components/Button'
import AddForm from '../components/AddForm';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CustomersPage() {
    const { isCard, toggleView } = useView()
    const { data: customers, isLoading, error } = useCustomers();
    const [open, setOpen] = useState(false);


    function handleOpen() {
        setOpen(open => !open)
    }


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;


    return <div>
        <div>
            <Button onClick={toggleView}>Switch to {!isCard ? <> Card < FaThLarge /></> : <>Table < FaTable /></>}</Button>
            <Button onClick={handleOpen}><FaUserPlus /></Button>
            {!isCard ? <Table customers={customers} /> : <Cards customers={customers} />}
        </div>
        <>
            <Dialog open={open} onClose={handleOpen}>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogContent>
                    <AddForm />
                </DialogContent>
            </Dialog>
        </>
    </div>

}

