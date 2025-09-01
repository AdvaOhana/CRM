import styles from '../styles/Table.module.css'
import { FaCog } from 'react-icons/fa'
import ActionMenu from './ActionMenu'

export default function Table({ data = [], onRowClick, onDelete }) {
    if (!data.length) return <p>No data available</p>;

    const headers = Object.keys(data[0])

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead >
                    <tr className={styles.tr}>
                        {headers.map(key => (
                            key !== "_id" ? (
                                <th key={key} className={styles.th}>{key}</th>
                            ) : null))}
                        <th className={styles.th}><FaCog /></th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx} className={styles.tr} onClick={() => onRowClick?.(row)} style={{ cursor: 'pointer' }}
                        >

                            {headers.map(key => (
                                key !== "_id" ? (
                                    <td key={key} className={styles.td}>{row[key]}</td>
                                ) : null))}
                            <td className={styles.td}>
                                <ActionMenu onClick={e => e.stopPropagation()} id={row._id} onDelete={onDelete} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}