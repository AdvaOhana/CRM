import styles from '../styles/Table.module.css'
import { FaCog } from 'react-icons/fa'
import ActionMenu from './ActionMenu'



export default function Table({ customers }) {
    const headers = Object.keys(customers[0])

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
                        <tr key={idx} className={styles.tr}>
                            {headers.map(key => (
                                <td key={key} className={styles.td}>{row[key]}</td>
                            ))}
                            <td className={styles.td}>
                                <ActionMenu customerId={row.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}