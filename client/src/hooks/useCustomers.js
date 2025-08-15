import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchCustomers() {
    const res = await fetch('http://localhost:3001/api/clients')
    if (!res.ok) throw new Error("Failed to fetch clients");
    const data = await res.json()
    return data.clients
}
export function useCustomers() {
    return useQuery({
        queryKey: ["clients"],
        queryFn: fetchCustomers
    })
}

async function addCustomer(customer) {
    const res = await fetch('http://localhost:3001/api/clients/addClient', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
    if (!res.ok) throw new Error("Failed to create client")
    return res.json()
}
export function useAddCustomer() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addCustomer,
        onSuccess: () => { queryClient.invalidateQueries(["clients"]) },
    })
}

async function updateCustomer(customer) {
    const res = await fetch(`http://localhost:3001/api/clients/updateClient/${customer._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
    if (!res.ok) throw new Error("Failed to update client");
    return res.json()
}
export function useUpdateCustomer() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"])
        }
    })
}

async function deleteCustomer(id) {
    const confirmed = window.confirm("Are you sure you want to delete this customer?")
    if (!confirmed) return

    const res = await fetch(`http://localhost:3001/api/clients/deleteClient/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete client");
    return res.json()
}
export function useDeleteCustomer() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"])
        }
    })
}