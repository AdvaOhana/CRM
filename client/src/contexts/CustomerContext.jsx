import { createContext, useContext, useState } from "react";
import { customers as initinalCustomers } from '../data/myObj'

const CustomerContext = createContext()

export function CustomerProvider({ children }) {

    const [customers, setCustomers] = useState(initinalCustomers)

    function updateCustomer(customer) {
        setCustomers((cur) => cur.map((c) => c.id === customer.id ? customer : c))
    }
    function deleteCustomer(id) {
        const confirmed = window.confirm("Are you sure you want to delete this customer?")
        if (!confirmed) return
        setCustomers((cur) => cur.filter((c) => c.id !== id))
    }
    function addCustomer(customer) {
        setCustomers((customers) => [...customers, customer])
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