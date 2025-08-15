import styles from '../styles/Cards.module.css'
import ActionMenu from './ActionMenu'
import { useNavigate } from 'react-router-dom';
// import { useCustomers } from "../contexts/CustomerContext"
import { useCustomers } from '../hooks/useCustomers';


export default function Cards() {
    const navigate = useNavigate();
    const { data: customers, isLoading, error } = useCustomers()
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;


    return (<div className={styles.container}>
        {customers.length ? Object.entries(customers).map(([key, value]) => (
            <div key={key} className={styles.card} onClick={() => navigate(`${value._id}`)} style={{ cursor: 'pointer' }}>
                <div className={styles.cardContent}>
                    <div>
                        {Object.entries(value).map(([k, v]) =>
                            k !== '_id' ? (
                                <p key={k}>
                                    <strong>{k}:</strong> {v}
                                </p>
                            ) : null
                        )}
                    </div>

                    <ActionMenu onClick={e => e.stopPropagation()} customerId={value._id} />
                </div>
            </div>
        )) : null}
    </div>
    )
}