import { useView } from '../contexts/ViewContext'
import Cards from '../components/Cards'
import Table from '../components/Table'
import Button from '../components/Button'
import { FaUserPlus, FaThLarge, FaTable } from 'react-icons/fa';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import AddForm from '../components/AddForm';
import { customers as initinalCustomers } from '../data/myObj'


export default function CustomersPage() {
    const { isCard, toggleView } = useView()
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState(initinalCustomers)


    function handleOpen() {
        setOpen(open => !open)
    }

    function handleAddCustomer(newCustomer) {
        setCustomers(customers => [...customers, newCustomer])
    }

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
                    <AddForm onAddCustomer={handleAddCustomer} />
                </DialogContent>
            </Dialog>
        </>
    </div>

}

