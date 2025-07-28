export default function Table({ customers }) {
    const headers = Object.keys(customers[0])

    return (
        <table style={{ border: '1px solid black' }}>
            <thead >
                <tr >
                    {headers.map(key => (
                        <th key={key} style={{ border: '1px solid black' }}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {customers.map((row, idx) => (
                    <tr key={idx}>
                        {headers.map(key => (
                            <td style={{ border: '1px solid black' }}>{row[key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )

}