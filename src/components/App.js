import { useState } from 'react'
import { customers } from '../data/myObj'

export default function App() {
    const [view, setView] = useState('card')
    return (
        <>
            <Buttons onChange={setView} />
            {view === 'table' ? <Table /> : <Cards />}
        </>
    );
}



function Table() {
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

function Cards() {
    return (
        <div className='container'>
            {customers.map((customer) => (
                <div key={customer.id} className='card'>
                    <p>
                        <strong>Name: </strong>
                        {customer.name}
                    </p>

                    <p>
                        <strong>Phone: </strong>
                        {customer.phone}
                    </p>

                    <p>
                        <strong>Email: </strong>
                        {customer.email}
                    </p>

                    <p>
                        <strong>Description: </strong>
                        {customer.description}
                    </p>
                </div>
            ))}
        </div>
    )
}

function Buttons({ onChange }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <button onClick={() => onChange('table')}>Table</button>
            <button onClick={() => onChange('cards')}>Cards</button>
        </div>
    );
}
