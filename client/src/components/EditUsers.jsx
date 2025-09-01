import { useUsers, useUpdateUser, useDeleteUser } from "../hooks/useUsers"
import EditPage from "../pages/EditPage"

export default function EditClients() {
    return (
        <EditPage useItems={useUsers} useUpdate={useUpdateUser} useDelete={useDeleteUser} clientOrUser="User" redirectPath="/users" />
    )
}