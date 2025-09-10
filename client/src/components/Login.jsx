import { useEffect, useState } from 'react'
import styles from '../styles/Register.module.css'
import { useAuthQuery, useLogin } from '../hooks/useUsers.js'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate();
    const { mutate: login, isLoading, error, isSuccess } = useLogin()
    const { data: user, isLoading: isLoadingUser } = useAuthQuery()


    useEffect(() => {
        if (user && !isLoadingUser) {
            navigate('/about')
        }
    }, [user, isLoadingUser, navigate])

    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    function handleSubmit(e) {
        e.preventDefault()
        login(form)
    }
    function handleChange(e) {
        const { name, value } = e.target
        setForm((f) => ({ ...f, [name]: value }))
    }
    return (
        <div className={styles.loginPageWrapper}>
            <div className={styles.loginWrapper}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Login</h1>
                    <p className={styles.subtitle}>Enter your details to access your account.</p>
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className={styles.field}>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.actions}>
                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <p style={{ color: "red" }}>Error: {error.message}</p>
                    )}
                    {isSuccess && (
                        <p style={{ color: "green" }}>Login successful!</p>
                    )}

                    <div className={styles.footer}>
                        <p>Forgot your password? Contact your admin.</p>
                    </div>
                </div>
            </div>
        </div>)
}