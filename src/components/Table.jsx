import styles from '../styles/Table.module.css'
import { FaCog } from 'react-icons/fa'
import ActionMenu from './ActionMenu'
import { useNavigate } from 'react-router-dom';
import { useCustomers } from "../contexts/CustomerContext"




export default function Table() {
    const { customers } = useCustomers()
    const headers = Object.keys(customers[0])
    const navigate = useNavigate();


    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead >
                    <tr className={styles.tr}>
                        {headers.map(key => (
                            <th key={key} className={styles.th}>{key}</th>
                        ))}
                        <th className={styles.th}><FaCog /></th>

                    </tr>
                </thead>
                <tbody>
                    {customers.map((row, idx) => (
                        <tr key={idx} className={styles.tr} onClick={() => navigate(`${row.id}`)} style={{ cursor: 'pointer' }}
                        >

                            {headers.map(key => (
                                <td key={key} className={styles.td}>{row[key]}</td>
                            ))}
                            <td className={styles.td}>
                                <ActionMenu onClick={e => e.stopPropagation()} customerId={row.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}