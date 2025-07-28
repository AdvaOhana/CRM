export default function Buttons({ onChange }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <button onClick={() => onChange('table')}>Table</button>
            <button onClick={() => onChange('cards')}>Cards</button>
        </div>
    );
}