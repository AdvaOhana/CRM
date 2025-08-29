import styles from '../styles/Cards.module.css'
import ActionMenu from './ActionMenu'
// import { useNavigate } from 'react-router-dom';
// import { useCustomers } from '../hooks/useCustomers';


export default function Cards({ data = [], onCardClick }) {
    // const navigate = useNavigate();
    // const { data: customers, isLoading, error } = useCustomers()
    // if (isLoading) return <p>Loading...</p>;
    // if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;
    if (!data.length) return <p>No data available</p>;
    console.log(data);



    return (<div className={styles.container}>
        {data.map(item => (
            <div key={item._id} className={styles.card} onClick={() => onCardClick?.(item)} style={{ cursor: 'pointer' }}>
                <div className={styles.cardContent}>
                    {Object.entries(item).map(([k, v]) =>
                        k !== '_id' ? <p key={k}><strong>{k}:</strong> {v}</p> : null
                    )}
                </div>
                <ActionMenu onClick={e => e.stopPropagation()} customerId={item._id} />
            </div>
        ))}
    </div>)
}