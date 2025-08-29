import { useState } from "react";
import styles from '../styles/Register.module.css'
import { useRegister } from "../hooks/useUsers.js";
export default function Register() {
    const register = useRegister()
    const [form, setForm] = useState({
        name: "",
        role: "employee",
        email: "",
        phone: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log(form);

        register.mutate(form)
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }))
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.cardWrapper}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Fill in your details to register.</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="role">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                            >
                                <option value="admin">admin</option>
                                <option value="employee">employee</option>
                            </select>
                            <p className={styles.helperText}>Choose user permissions.</p>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="phone">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                required
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.actions}>
                            <button type="submit" className={styles.submitBtn}>
                                Register
                            </button>
                        </div>
                    </form>
                    <div className={styles.footer}>
                        <p>By registering, you agree to our Terms & Privacy Policy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
