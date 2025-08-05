import styles from '../styles/Cards.module.css'
import ActionMenu from './ActionMenu'
export default function Cards({ customers }) {

    return (<div className={styles.container}>
        {Object.entries(customers).map(([key, value]) => (
            <div key={key} className={styles.card}>
                <div className={styles.cardContent}>
                    <div>
                        {Object.entries(value).map(([k, v]) =>
                            k !== 'id' ? (
                                <p key={k}>
                                    <strong>{k}:</strong> {v}
                                </p>
                            ) : null
                        )}
                    </div>

                    <ActionMenu customerId={value.id} />
                </div>
            </div>
        ))}
    </div>
    )
}