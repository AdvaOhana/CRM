import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


async function fetchClients() {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)
    try {
        const res = await fetch('http://localhost:3001/api/clients', { signal: controller.signal })
        if (!res.ok) throw new Error("Failed to fetch clients");
        const data = await res.json()
        return data.clients

    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Server took too long to respond (30s)");
        }
        throw error;
    } finally {
        clearTimeout(timeout);
    }

}
export function useClients() {
    return useQuery({
        queryKey: ["clients"],
        queryFn: fetchClients
    })
}

async function addClients(client) {
    const res = await fetch('http://localhost:3001/api/clients/addClient', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Failed to create client")
    return data
}
export function useAddClients() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addClients,
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"])
            toast.success("Created client successfully!")
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create")
        }
    })
}

async function updateClients(client) {
    const res = await fetch(`http://localhost:3001/api/clients/updateClient/${client._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Failed to update client");
    return data
}
export function useUpdateClients() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateClients,
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"])
            toast.success("Update client successfully!")
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update")
        }
    })
}

async function deleteClients(id) {
    const confirmed = window.confirm("Are you sure you want to delete this client?")
    if (!confirmed) return

    const res = await fetch(`http://localhost:3001/api/clients/deleteClient/${id}`, {
        method: "DELETE",
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Failed to delete client");
    return data
}
export function useDeleteClients() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteClients,
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"])
            toast.success("Deleted client successfully!")
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete")
        }
    })
}