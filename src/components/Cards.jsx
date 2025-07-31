export default function Cards({ customers }) {

    return (<div className='container'>
        {Object.entries(customers).map(([key, value]) => (
            <div key={key} className='card'>
                {Object.entries(value).map(([k, v]) =>
                    k !== 'id' ? (
                        <p key={k}>
                            <strong>{k}:</strong> {v}
                        </p>
                    ) : null
                )}
            </div>
        ))}
    </div>
    )
}