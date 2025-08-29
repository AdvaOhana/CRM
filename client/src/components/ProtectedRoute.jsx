import { Navigate, Outlet } from "react-router-dom"
import { useAuthQuery } from "../hooks/useUsers.js"

function ProtectedRoute({ roles }) {
    const { data: user, isLoading } = useAuthQuery()

    if (isLoading) {
        return <div>loading..</div>
    }
    if (!user) {
        return <Navigate to="/" replace />
    }
    if (!roles.includes(user.role)) {
        return <Navigate to="/error" replace />
    }
    return <Outlet />
}

export default ProtectedRoute
