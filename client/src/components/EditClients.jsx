import { useCustomers, useUpdateCustomer, useDeleteCustomer } from "../hooks/useCustomers"
import EditPage from "../pages/EditPage"

export default function EditClients() {
    return (
        <EditPage useItems={useCustomers} useUpdate={useUpdateCustomer} useDelete={useDeleteCustomer} clientOrUser="Client" redirectPath="/clients" />
    )
}
