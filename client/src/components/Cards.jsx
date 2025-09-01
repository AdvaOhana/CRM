import styles from '../styles/Cards.module.css'
import ActionMenu from './ActionMenu'


export default function Cards({ data = [], onCardClick, onDelete }) {
    if (!data.length) return <p>No data available</p>;


    return (<div className={styles.container}>
        {data.map(item => (
            <div key={item._id} className={styles.card} onClick={() => onCardClick?.(item)}>
                <div className={styles.cardContent}>
                    {Object.entries(item).map(([k, v]) =>
                        k !== '_id' ? <p key={k}><strong>{k}:</strong> {v}</p> : null
                    )}
                </div>
                <ActionMenu onClick={e => e.stopPropagation()} id={item._id} onDelete={onDelete} />
            </div>
        ))}
    </div>)
}