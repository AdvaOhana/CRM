import styles from '../styles/Button.module.css'

export default function Button({ onClick, className, children }) {
    return (
        <button onClick={onClick} className={`${styles.button} ${className}`}>{children}</button>
    );
}