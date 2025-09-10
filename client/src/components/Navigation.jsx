import { FaHome, FaUsers, FaSignOutAlt, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import { useLogoutUser, useAuthQuery } from '../hooks/useUsers.js'
import Button from './Button';
import AddForm from '../components/AddForm';
import styles from '../styles/App.module.css'
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Navigation() {
    const { data: user } = useAuthQuery()
    const { logoutUserMutate } = useLogoutUser()
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(open => !open)
    }
    return (
        <>
            <nav className={styles["nav-container"]}>
                <ul className={styles.navListLeft}>
                    {!user && (
                        <li> <NavLink to="/" className={styles.link}> Login</NavLink></li>
                    )}
                    {user && (
                        <>
                            <li><NavLink to="/about" className={styles.link}> <FaHome /> About </NavLink> </li>
                            {user.role === "admin" && (
                                <>
                                    <li> <NavLink to="users/register" className={styles.link}> Register </NavLink> </li>
                                    <li><NavLink to="/users" className={styles.link}> <FaUserCircle /> Users </NavLink> </li>
                                </>
                            )}
                            <li><NavLink to="/clients" className={styles.link}> <FaUsers /> Clients </NavLink> </li>
                        </>
                    )}
                </ul>

                {user && (
                    <ul className={styles.navListRight}>
                        <li> <Button onClick={handleOpen}> <FaUserPlus /> </Button> </li>
                        <li> <button onClick={logoutUserMutate} className={styles.logoutButton}> <FaSignOutAlt /> Logout </button></li>
                    </ul>
                )}
            </nav>

            <Dialog open={open} onClose={handleOpen} PaperProps={{ sx: { borderRadius: "18px", } }}>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogContent>
                    <AddForm />
                </DialogContent>
            </Dialog>
        </>
    );
}