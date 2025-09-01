import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function logoutUser() {

    const res = await fetch('http://localhost:3001/api/users/logout', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
    })
    if (!res.ok) throw new Error("Failed to logout")
    return res.json()
}
export function useLogoutUser() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: logoutUserMutate } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.clear()
            navigate('/', { replace: true })
        }

    })

    return { logoutUserMutate }
}
async function register(user) {

    const res = await fetch('http://localhost:3001/api/users/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: 'include'

    })
    if (!res.ok) throw new Error("Failed to register")
    return res.json()
}
export function useRegister() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            queryClient.invalidateQueries(["users"])

            console.log("Created")
        }

    })
}

async function login(user) {
    const res = await fetch('http://localhost:3001/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: 'include'
    })
    if (!res.ok) throw new Error("Failed to login")
    return res.json()
}
export function useLogin() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: login,
        onSuccess: async () => {
            const res = await fetchAuth()
            queryClient.setQueryData(['auth'], res);
            console.log("Login successful");
        }
    })
}
async function fetchAuth() {
    const res = await fetch('http://localhost:3001/api/auth', {
        credentials: 'include'
    });
    if (!res.ok) throw new Error("Failed to fetch auth");
    const data = await res.json();
    return data.user;
}

export function useAuthQuery() {
    return useQuery({
        queryKey: ['auth'],
        queryFn: fetchAuth,
        retry: false,
        staleTime: 10 * 60 * 1000
    });
}

async function fetchUsers() {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)
    try {
        const res = await fetch('http://localhost:3001/api/users', { signal: controller.signal })
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json()
        return data.users

    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Server took too long to respond (30s)");
        }
        throw error;
    } finally {
        clearTimeout(timeout);
    }

}
export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers
    })
}

async function updateUser(user) {
    const res = await fetch(`http://localhost:3001/api/users/updateUser/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
    if (!res.ok) throw new Error("Failed to update client");
    return res.json()
}
export function useUpdateUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries(["users"])
        }
    })
}

async function deleteUser(id) {
    const confirmed = window.confirm("Are you sure you want to delete this customer?")
    if (!confirmed) return

    const res = await fetch(`http://localhost:3001/api/users/deleteUser/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete client");
    return res.json()
}
export function useDeleteUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries(["users"])
        }
    })
}
