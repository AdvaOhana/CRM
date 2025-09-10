import { useClients, useUpdateClients, useDeleteClients } from "../hooks/useClients"
import EditPage from "../pages/EditPage"

export default function EditClients() {
    return (
        <EditPage useItems={useClients} useUpdate={useUpdateClients} useDelete={useDeleteClients} clientOrUser="Client" redirectPath="/clients" />
    )
}
