import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const CustomerContext = createContext()

export function CustomerProvider({ children }) {

    const [customers, setCustomers] = useState([])
    useEffect(() => {
        async function fetchCustomers() {
            try {
                const res = await fetch('/api/clients')
                const data = await res.json()
                setCustomers(data.clients)
            } catch (error) {
                console.log(error);

            }

        }
        fetchCustomers()
    }, [])

    async function addCustomer(customer) {
        try {
            const res = await fetch('/api/clients/addClient', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer)
            })
            if (!res.ok) throw new Error("Failed to create client")
            setCustomers((customers) => [...customers, customer])

        } catch (error) {
            console.log(error);
        }
    }

    async function updateCustomer(customer) {
        try {
            const res = await fetch(`/api/clients/updateClient/${customer._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer)
            })
            if (!res.ok) throw new Error("Failed to update client");

            setCustomers((cur) => cur.map((c) => c._id === customer._id ? customer : c))
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteCustomer(id) {
        const confirmed = window.confirm("Are you sure you want to delete this customer?")
        if (!confirmed) return
        try {
            const res = await fetch(`api/clients/deleteClient/${id}`, {
                method: "DELETE",
            })
            if (!res.ok) throw new Error("Failed to delete client");
            setCustomers((cur) => cur.filter((c) => c._id !== id))

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CustomerContext.Provider value={{ customers, updateCustomer, deleteCustomer, addCustomer }}>{children}</CustomerContext.Provider>
    )
}
export function useCustomers() {
    const context = useContext(CustomerContext)
    if (context === undefined) throw new Error('ViewContext was used outside of the provider')
    return context
}