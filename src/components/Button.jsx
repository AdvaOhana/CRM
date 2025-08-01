import styles from '../styles/Button.module.css'

export default function Button({ onClick, children }) {
    return (
        <button onClick={onClick} className={styles.button}>{children}</button>
    );
}