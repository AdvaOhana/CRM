import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthQuery } from "../hooks/useUsers.js"

export default function ProtectedRoute({ roles }) {
    const { data: user, isLoading } = useAuthQuery()
    const location = useLocation()
    if (isLoading) {
        return <div>loading..</div>
    }
    if (!user) {
        return <Navigate to="/" replace state={{ from: location }} />
    }
    if (!roles.includes(user.role)) {
        return <Navigate to="/error" replace />
    }
    return <Outlet />
}

