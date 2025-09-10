import styles from '../styles/App.module.css'
export default function AboutPage() {

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>About the App</h1>
            <p>
                The application is designed to efficiently manage your organization's operations:
                <li> Create and manage users with different roles (Admin / Employee).</li>
                <li>Add, edit, and delete clients easily and intuitively.</li>
                <li> User-friendly interface with quick access to key management tools.</li>
                <li> Built-in security with role-based permissions and secure login.</li>
                Admins have full control, while employees get access only to what they need - making everyday work simple and efficient.
            </p>
        </div>
    );
}